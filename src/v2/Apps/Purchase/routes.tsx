/* eslint-disable sort-keys-fix/sort-keys-fix */
import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const PurchasesApp = loadable(() => import("./PurchaseApp"), {
  resolveComponent: component => component.PurchaseAppFragmentContainer,
})

export const routes: RouteConfig[] = [
  {
    path: "/user/purchases",
    getComponent: () => PurchasesApp,
    prepare: () => {
      PurchasesApp.preload()
    },
    query: graphql`
      query routes_PurchaseQuery {
        me {
          ...PurchaseApp_me
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
