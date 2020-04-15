import React from 'react'
import styled from 'styled-components'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'
import Player from '@src/components/Player'
// import SubscribeBar from './SubscribeBar'
import { Helmet } from 'react-helmet'
import { withRouteData } from 'react-static'
import { Episode } from 'podcats'

export default withRouteData(Header)

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
  padding: 1rem 3rem 4rem;
  @media (max-width: 650px) {
    padding: 1rem 0 4rem;
  }
  width: 100%;
  color: white;
`
const HeaderNav = styled('div')`
  width: 100%;
`

function Header({
  siteData,
}: { siteData: SiteData } & Props) {
  const { description, myURL, image } = siteData
  const curEp = content || mostRecentEpisode
  const titleHead = curEp.frontmatter.episode
    ? `Ep ${curEp.frontmatter.episode}: ${curEp.frontmatter.title}`
    : curEp.frontmatter.title
  const desc = content ? description : mostRecentEpisode.frontmatter.description
  return (
    <AHeader>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Commuteless - {titleHead}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={titleHead} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={myURL} />
        <meta property="og:site_name" content={titleHead} />
        <meta name="twitter:title" content={titleHead} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@commutelessfm" />
        <meta name="twitter:creator" content="@commutelessfm" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Helmet>
      <HeaderNav>
        <h2>
          <a href={myURL}>Commuteless.fm</a>
        </h2>
      </HeaderNav>
      <EpisodeInfo>
        <HeaderLeft mostRecentEpisode={mostRecentEpisode} />
        <HeaderRight mostRecentEpisode={mostRecentEpisode} />
      </EpisodeInfo>
      <Player mostRecentEpisode={mostRecentEpisode} />
      {/* <SubscribeBar /> */}
    </AHeader>
  )
}
