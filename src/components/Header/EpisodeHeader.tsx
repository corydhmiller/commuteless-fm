import React from 'react'
import styled from 'styled-components'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'
import { withRouteData } from 'react-static'
import { Episode } from 'podcats'

export default withRouteData(EpisodeHeader)

type Props = { content?: Episode; mostRecentEpisode?: Episode }
type SiteData = {
  description: string
  myURL: string
  image: string
}

const EpisodeInfo = styled('div')`
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  font-size: 1.5rem;
  max-width: 1180px;
  @media screen and (min-width: 740px) {
    justify-items: left;
    grid-template-columns: minmax(250px, 1fr) 2fr;
  }
`
const AHeader = styled('header')`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  padding: 1rem 1rem 0;
  @media (max-width: 650px) {
    padding: 1rem 1rem 0;
  }
  width: 100%;
  color: white;
`

function EpisodeHeader({
  mostRecentEpisode,
}: { siteData: SiteData } & Props) {
  
  return (
    <AHeader>
      <EpisodeInfo>
        <HeaderLeft mostRecentEpisode={mostRecentEpisode} />
        <HeaderRight mostRecentEpisode={mostRecentEpisode} />
      </EpisodeInfo>
      {/* <SubscribeBar /> */}
    </AHeader>
  )
}
