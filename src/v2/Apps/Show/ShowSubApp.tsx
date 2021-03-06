import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Separator } from "@artsy/palette"
import { ShowSubApp_show } from "v2/__generated__/ShowSubApp_show.graphql"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { BackLink } from "v2/Components/Links/BackLink"
import { ShowMetaFragmentContainer as ShowMeta } from "./Components/ShowMeta"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"

interface ShowAppProps {
  show: ShowSubApp_show
}

const ShowApp: React.FC<ShowAppProps> = ({ children, show }) => {
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()

  return (
    <>
      <ShowMeta show={show} />

      <AppContainer>
        <AnalyticsContext.Provider
          value={{
            contextPageOwnerId: show.internalID,
            contextPageOwnerSlug,
            contextPageOwnerType,
          }}
        >
          <HorizontalPadding>
            <BackLink my={3} to={show.href}>
              Back to {show.name}
              {!show.isFairBooth && show.partner?.name && (
                <> at {show.partner.name}</>
              )}
            </BackLink>

            <Box minHeight="50vh">{children}</Box>

            <Separator as="hr" my={3} />

            <Footer />
          </HorizontalPadding>
        </AnalyticsContext.Provider>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export const ShowSubAppFragmentContainer = createFragmentContainer(ShowApp, {
  show: graphql`
    fragment ShowSubApp_show on Show {
      id
      internalID
      slug
      name
      href
      isFairBooth
      partner {
        ... on Partner {
          name
        }
        ... on ExternalPartner {
          name
        }
      }
      ...ShowMeta_show
    }
  `,
})
