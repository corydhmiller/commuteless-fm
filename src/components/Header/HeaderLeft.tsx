import React from 'react'
import { Episode } from '../../types'
import styled from 'styled-components'

import { withRouteData } from 'react-static'

type Props = { content?: Episode; mostRecentEpisode?: Episode }

const ImDiv = styled('div')`
  padding: 1rem 3rem 1rem 0;
  4px 5px 11px rgba(0, 0, 0, 0.3), -1px -1px 1px rgba(255, 255, 255, 0.3), -3px -3px 8px #505050
`

const Image = styled('img')`
  max-width: 100%;
  width: auto;
  height: auto;
  max-height: 300px;
  border-radius: 1rem;
`

const HeaderSection = (mostRecentEpisode: Episode) => ({ content }: Props) => {
  const curEp = content || mostRecentEpisode
  return (
    <>
      <ImDiv>
        <Image src={'/' + curEp.frontmatter.episodeimage} />
      </ImDiv>
    </>
  )
}

export default ({ mostRecentEpisode }: { mostRecentEpisode: Episode }) => {
  const HeaderLeft = withRouteData(HeaderSection(mostRecentEpisode))
  return <HeaderLeft />
}
