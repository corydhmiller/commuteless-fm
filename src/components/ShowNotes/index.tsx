import React from 'react'
import { Episode } from '../../types'
import { withRouteData } from 'react-static'
import styled from 'styled-components'
import DownloadBar from './DownloadBar'
const SNDiv = styled('div')`
  width: 62%;
  font-size: 1.25rem;
  padding: 2rem;
  border-left: 1px solid #ddd;
  background: #fefefe;
  color: black;
  position: -webkit-sticky;
  position: sticky;
  top: 102px;
  height: calc(100vh - 102px);
  overflow-y: scroll;
  h2 {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 1rem;
    margin-bottom: 0;
    margin-top: 0;
  }
  @media (max-width: 650px) {
    width: 100%;
    border: none;
  }
`
const HostWrapper = styled('div')`
  border-top: 1px solid #e4e4e4;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 2rem;
  margin-top: 3rem;
`
const HostDiv = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  padding: 0.5rem;
  img {
    max-width: 85px;
    border-radius: 50%;
  }
`

type Props = { content?: Episode; mostRecentEpisode?: Episode }
export default withRouteData(({ content, mostRecentEpisode }: Props) => {
  const curEp = content || mostRecentEpisode
  if (!curEp) return 'no content'
  // const titleHead = curEp.frontmatter.episode
  //   ? `Ep ${curEp.frontmatter.episode}: ${curEp.frontmatter.title}`
  //   : curEp.frontmatter.title
  return (
    <SNDiv>
      <h2>Shownotes</h2>
      <DownloadBar curEp={curEp} />
      <div dangerouslySetInnerHTML={{ __html: curEp.body }} />
      <HostWrapper>
        <HostDiv>
          <img src="/images/person/kyle-adams-85.jpg" />
          Kyle Adams
          <a
            style={{ fontSize: '.85rem' }}
            href="https://twitter.com/itskyleadams"
          >
            @itskyleadams
          </a>
        </HostDiv>
        <HostDiv>
          <img src="/images/person/cory-miller-85.jpg" />
          Cory Miller
          <a
            style={{ fontSize: '.85rem' }}
            href="https://twitter.com/corydhmiller"
          >
            @corydhmiller
          </a>
        </HostDiv>
      </HostWrapper>
    </SNDiv>
  )
})
