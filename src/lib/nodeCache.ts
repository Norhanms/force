import NodeCache from "node-cache"
import crypto from "crypto"

const DEFAULT_OPTIONS = {
  checkperiod: 120,
  maxKeys: 10000,
  stdTTL: 100,
  useClones: false,
}

export class MemoryCache<T = string> {
  private cache: NodeCache

  constructor() {
    this.cache = new NodeCache({
      ...DEFAULT_OPTIONS,
    })
  }

  get(key: string): T {
    const hashKey = this.hashKey(key)

    return this.cache.get<T>(hashKey)
  }

  set(key: string, data: T) {
    const hashKey = this.hashKey(key)
    this.cache.set<T>(hashKey, data)
  }

  refresh(key: string) {
    const hashKey = this.hashKey(key)
    this.cache.ttl(hashKey)
  }

  private hashKey(key: string): string {
    const hash = crypto.createHash("sha256")
    hash.update(key)
    return hash.digest("hex")
  }

  logStats() {
    console.log(this.cache.getStats())
  }
}
