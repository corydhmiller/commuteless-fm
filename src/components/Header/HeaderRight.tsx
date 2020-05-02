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
              <a href="https://podcasts.apple.com/us/podcast/commuteless/id1510958925" target="_blank" rel="noopener">Apple Podcasts</a>
            </li>
            <li>
              <a href="https://open.spotify.com/show/4gWjd6t6vTIXfb8IDHmgoZ?si=eTBAfw0aSVmktyvcoTvU0Q" target="_blank" rel="noopener">Spotify</a>
            </li>
            <li>
              <a href="https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&isi=691797987&ius=googleplaymusic&apn=com.google.android.music&link=https://play.google.com/music/m/Igv3juui3mcifaxkk6sf2vcskfi?t%3DCommuteless%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16" target="_blank" rel="noopener">Google Play</a>
            </li>
            <li>
              <a href="http://tun.in/pjQHm" target="_blank" rel="noopener">TuneIn</a>
            </li>
            <li>
              <a href="https://www.stitcher.com/podcast/commuteless" target="_blank" rel="noopener">Stitcher</a>
            </li>
            <li>
              <a href=" https://lynx.commuteless.fm/rss" target="_blank" rel="noopener">RSS</a>
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
