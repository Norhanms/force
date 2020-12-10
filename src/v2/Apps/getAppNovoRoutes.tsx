import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import * as artistRoutes from "v2/Apps/Artist/routes"
import * as artistSeriesRoutes from "./ArtistSeries/routes"
import * as artistsRoutes from "v2/Apps/Artists/artistsRoutes"
import * as artworkRoutes from "v2/Apps/Artwork/routes"
import * as collectRoutes from "v2/Apps/Collect/collectRoutes"
import * as consignRoutes from "v2/Apps/Consign/consignRoutes"
import * as conversationRoutes from "v2/Apps/Conversation/routes"
import * as debugRoutes from "./Debug/debugRoutes"
import * as fairRoutes from "v2/Apps/Fair/routes"
import * as featureRoutes from "v2/Apps/Feature/routes"
import * as identityVerificationRoutes from "v2/Apps/IdentityVerification/routes"
import * as orderRoutes from "v2/Apps/Order/routes"
import * as purchasesRoutes from "v2/Apps/Purchase/routes"
import * as searchRoutes from "v2/Apps/Search/routes"
import * as showRoutes from "v2/Apps/Show/routes"
import * as viewingRoomRoutes from "./ViewingRoom/routes"

export function getAppNovoRoutes(): RouteConfig[] {
  return buildAppRoutes([
    {
      routes: artistRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: artistsRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: artistSeriesRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: artworkRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: collectRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: consignRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: conversationRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    // For debugging baseline app shell stuff
    {
      routes: debugRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: fairRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: featureRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: identityVerificationRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: orderRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: purchasesRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: searchRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: showRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
    {
      routes: viewingRoomRoutes.routes.map(route => ({
        ...route,
        path: `/novo${route.path}`,
      })),
    },
  ])
}
