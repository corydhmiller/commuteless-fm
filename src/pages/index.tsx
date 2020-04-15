import React from 'react'
import { withSiteData } from 'react-static'
// import { Link } from '@reach/router'
import { Episode, FMType } from '../types'
import Header from '@src/components/Header'
// import Player from '@src/components/Player'
import ShowList from '@src/components/ShowList'
import ShowNotes from '@src/components/ShowNotes'
import Footer from '@src/components/Footer'
import styled from 'styled-components'

const Main = styled('main')`
  // background: #fff;
  // box-shadow: 3px 3px 10px rgba(0,0,0,.25);
  display: flex;
  flex-wrap: wrap;
`

type Props = {
  frontmatters: FMType[]
  mostRecentEpisode: Episode
  title: string
  description: string
  myURL: string
  image: string
  episodeimage: string
  hosts: string
}
export default withSiteData(
  ({
    frontmatters,
    mostRecentEpisode,
    title,
    description,
    myURL,
    image,
    episodeimage,
    hosts
  }: Props) => {
    return (
      <>
        <Header
          siteData={{
            title,
            description,
            myURL,
            image,
            episodeimage,
            hosts
          }}
          mostRecentEpisode={mostRecentEpisode}
        />
        <Main>
          <ShowList frontmatters={frontmatters} />
          <ShowNotes mostRecentEpisode={mostRecentEpisode} />
        </Main>
        <Footer />
      </>
    )
  },
)
