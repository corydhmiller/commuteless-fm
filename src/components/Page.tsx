import React from 'react'

import { withSiteData } from 'react-static'
import { Episode, FMType } from '../types'
import Header from '@src/components/Header'
import Footer from '@src/components/Footer'
import ShowList from '@src/components/ShowList'
import ShowNotes from '@src/components/ShowNotes'
import styled from 'styled-components'

const Main = styled('main')`
  display: flex;
  flex-wrap: wrap;
  padding:0 1rem;
`

type Props = {
  frontmatters: FMType[]
  mostRecentEpisode: Episode
  title: string
  description: string
  myURL: string
  image: string
}
export default withSiteData(
  ({
    frontmatters,
    mostRecentEpisode,
    title,
    description,
    myURL,
    image,
  }: Props) => {
    return (
      <>
        <Header
          siteData={{
            title,
            description,
            myURL,
            image,
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
