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
    text-align: center;
    font-size: 1rem;
  }
`

const EpisodeHosts = styled('p')``

const ListenOnDiv = styled('div')`
  padding-top: 1.5rem;
  opacity: 0.85;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 1.15rem;
  }
  li {
    display: inline-block;
    font-weight: normal;
    &:not(:first-child):before {
      content: '•';
      padding: 0 0.25rem;
    }
    &:before {
    }
    a {
      color: inherit;
      &:hover {
        color: #ee4060;
      }
    }
  }
`
const PurpleDivider = styled('div')`
  background: #6e4a9e;
  width: 3rem;
  height: 0.2rem;
  @media screen and (max-width: 650px) {
    margin: 0 auto;
  }
`

const HeaderSection = (mostRecentEpisode: Episode) => ({ content }: Props) => {
  const curEp = content || mostRecentEpisode
  return (
    <>
      <HeaderRightDiv>
        <EpisodeNum>Episode {curEp.frontmatter.episode}</EpisodeNum>
        <EpisodeTitle>{curEp.frontmatter.title}</EpisodeTitle>
        <EpisodeHosts>{curEp.frontmatter.hosts}</EpisodeHosts>
        <PurpleDivider />
        <ListenOnDiv>
          <ul>
            <li>
              <a href="#">Apple Podcasts</a> <small>coming soon</small>
            </li>
            <li>
              <a href="https://open.spotify.com/show/4gWjd6t6vTIXfb8IDHmgoZ?si=eTBAfw0aSVmktyvcoTvU0Q">Spotify</a>
            </li>
            <li>
              <a href="#">Google Play</a> <small>coming soon</small>
            </li>
            {/* <li>
              <a href="#">Overcast</a>
            </li> */}
          </ul>
        </ListenOnDiv>
      </HeaderRightDiv>
    </>
  )
}

export default ({ mostRecentEpisode }: { mostRecentEpisode: Episode }) => {
  const HeaderRight = withRouteData(HeaderSection(mostRecentEpisode))
  return <HeaderRight />
}
