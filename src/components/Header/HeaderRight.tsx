import React from 'react'
import { Episode } from '../../types'
import styled from 'styled-components'

import { withRouteData } from 'react-static'

type Props = { content?: Episode; mostRecentEpisode?: Episode }

const EpisodeNum = styled('p')`
  margin: 0;
  font-style: italic;
`
const EpisodeTitle = styled('h1')`
  margin: 0;
`

const HeaderRightDiv = styled('div')`
@media screen and (max-width: 650px) {
text-align:center;
font-size:1rem;
}`

const EpisodeHosts = styled('p')``

const HeaderSection = (mostRecentEpisode: Episode) => ({ content }: Props) => {
  const curEp = content || mostRecentEpisode
  return (
    <>
      <HeaderRightDiv>
        <EpisodeNum>Episode {curEp.frontmatter.episode}</EpisodeNum>
        <EpisodeTitle>{curEp.frontmatter.title}</EpisodeTitle>
        <EpisodeHosts>{curEp.frontmatter.hosts}</EpisodeHosts>
      </HeaderRightDiv>
    </>
  )
}

export default ({ mostRecentEpisode }: { mostRecentEpisode: Episode }) => {
  const HeaderRight = withRouteData(HeaderSection(mostRecentEpisode))
  return <HeaderRight />
}
