import React from 'react'
import styled from 'styled-components'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'
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
  padding: 1rem 1rem 0;
  @media (max-width: 650px) {
    padding: 1rem 1rem 0;
  }
  width: 100%;
  color: white;
`
const HeaderNav = styled('div')`
  width: 100%;
`

function Header({
  siteData,
  content,
  mostRecentEpisode,
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
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
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
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#614f87" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#614f87" />
        <link rel="manifest" href="/site.webmanifest" />
      </Helmet>
      <HeaderNav className="header-nav">
        <h2>
          <a href={myURL}>Commuteless.fm</a>
        </h2>
      </HeaderNav>
      <EpisodeInfo>
        <HeaderLeft mostRecentEpisode={mostRecentEpisode} />
        <HeaderRight mostRecentEpisode={mostRecentEpisode} />
      </EpisodeInfo>
      {/* <SubscribeBar /> */}
    </AHeader>
  )
}
