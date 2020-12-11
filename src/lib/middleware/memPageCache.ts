import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { MemoryCache } from "lib/nodeCache"

const memCache = new MemoryCache()

// Middleware will `next` and do nothing if any of the following is true:
//
// * page cache feature is disabled.
// * a user is signed in.
// * this isnt a supported cacheable path (there is an allow-list set in ENV).
// * the page content is uncached.
// * the cache errors.
export async function memCacheMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  // if (!PAGE_CACHE_ENABLED) return next()
  // @ts-ignore
  if (!req.originalUrl.startsWith("/novo")) {
    return next()
  }

  // If we are logged in
  // @ts-ignore
  const hasUser = !!req.user
  if (hasUser) return next()

  const chunks = []
  // @ts-ignore
  const defaultWrite = res.write
  // @ts-ignore
  const defaultEnd = res.end

  let sent = false

  // @ts-ignore
  res.write = (...restArgs) => {
    chunks.push(new Buffer(restArgs[0]))
    defaultWrite.apply(res, restArgs)
  }

  // @ts-ignore
  res.end = (...restArgs) => {
    if (restArgs[0]) {
      chunks.push(new Buffer(restArgs[0]))
    }
    defaultEnd.apply(res, restArgs)
  }

  // Register callback to write rendered page data to cache.
  // @ts-ignore
  res.once("finish", () => {
    console.log(`[Mem Cache]: Writing to cache`)
    if (!sent) {
      const body = Buffer.concat(chunks)
      // @ts-ignore
      memCache.set(`${req.originalUrl}-content`, body)
      // @ts-ignore
      memCache.set(`${req.originalUrl}-headers`, res._headers)
      memCache.logStats()
    } else {
      // @ts-ignore
      memCache.refresh(`${req.originalUrl}-content`)
      // @ts-ignore
      memCache.refresh(`${req.originalUrl}-headers`)
    }
  })

  // @ts-ignore
  const html = memCache.get(`${req.originalUrl}-content`)
  if (html) {
    console.log(`[Mem Cache]: Reading from cache`)
    sent = true
    // @ts-ignore
    const headers = memCache.get(`${req.originalUrl}-headers`)
    for (const header of Object.keys(headers)) {
      // @ts-ignore
      res.setHeader(header, headers[header])
    }
    // @ts-ignore
    return res.send(html)
  } else {
    next()
  }
}
