import React from "react"
import { graphql, StaticQuery } from "gatsby"

import AppleImage from "../../content/images/badges/apple.svg"
import SpotifyImage from "../../content/images/badges/spotify.svg"
import GoogleImage from "../../content/images/badges/google.svg"
import { FaPlay } from "react-icons/fa"

import styled from "styled-components"
import BackgroundImage from "gatsby-background-image"
import SiteContext from "../../SiteContext"
import Menu from "./Menu"

const Platforms = [
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/commuteless/id1510958925",
    image: AppleImage,
  },
  {
    name: "Spotify",
    url:
      "https://open.spotify.com/album/5wsaSNJTS4x2XhO30SD3NL?si=Am9aZH-XRj2ltRoSxkCsHQ",
    image: SpotifyImage,
  },
  {
    name: "Google Play",
    url:
      "https://podcasts.google.com/?feed=aHR0cHM6Ly9seW54LmNvbW11dGVsZXNzLmZtL3Jzcw%3D%3D",
    image: GoogleImage,
  },
  {
    name: "TuneIn",
    url: "http://tun.in/pjQHm",
  },
  {
    name: "Stitcher",
    url: "https://www.stitcher.com/podcast/commuteless",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCeisEao_HIiBETm4aK_ivVg",
  },
  {
    name: "RSS",
    url: "https://lynx.commuteless.fm/rss",
  },
]

interface PlatformsTypes {
  name: string
  url: string
  image?: string
}

interface HeaderProps {
  episode?: any
  currentPage: any
  setEpisode: Function
  setIsPlaying: Function
}

const HeaderWithBackground = styled(BackgroundImage)`
  display: grid;
  align-items: center;
  justify-content: center;

  &:after {
    background: linear-gradient(
      0,
      var(--color-lightblack) 0,
      transparent 25%
    ) !important;
    z-index: 2 !important;
    opacity: 1 !important;
  }
  &:before {
    background-size: 300%;
    @media screen and (max-width: 300px) {
      background-size: cover;
    }

    @media screen and (min-width: 1000px) {
      background-size: cover;
    }
  }
`

const HeaderH1 = styled.h1`
  margin: 0;
  font-weight: 400;
  font-size: 2rem;
  @media screen and (min-width: 400px) {
    font-size: 10vw;
  }
  @media screen and (min-width: 700px) {
    font-size: 8vw;
  }
  @media screen and (min-width: 900px) {
    font-size: 6rem;
  }
`
const HeaderH2 = styled.h2`
  margin: 0;
  font-size: 2rem;
`

const PlatformsWrapper = styled.div`
  border-top: 1px solid var(--color-lightpurple);
  margin-top: 1.5rem;
`
const PlatformImage = styled.img`
  max-width: 135px;
  opacity: 0.6;
  transition: 0.6s all ease;
  &:hover {
    opacity: 1;
  }
`
const PlatformList = styled.ul`
  padding: 0;
  margin-top: 0.6rem;
  list-style-type: none;
  font-size: 1rem;
  li {
    display: inline-block;
    a {
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
    &:not(:last-child) {
      &:after {
        opacity: 0.6;
        content: "•";
        margin: 0 0.5rem;
      }
    }
  }
`
const MainPlatformsList = styled.ul`
  padding: 0;
  margin-top: 1.5rem;
  list-style-type: none;
  padding: 0 1rem;
  li {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`

const HeaderTitleSection = ({ ...props }) => {
  const context = props.context
  if (context.currentPage.type === "episode") {
    return (
      <>
        <HeaderH1
          style={{
            marginTop: 0,
            textShadow: "2px 2px 6px var(--color-lightblack)",
          }}
        >
          {context.currentPage.title}
        </HeaderH1>
        <h2 style={{ fontWeight: 400, color: "var(--color-lightpurple)" }}>
          {context.currentPage.hosts}
        </h2>
        <h3 style={{ fontWeight: 400, opacity: 0.6 }}>
          {context.currentPage.date}
        </h3>
        <div style={{ margin: "0 auto" }}>
          <button
            style={{
              marginBottom: "1rem",
              display:
                context.episode.number === context.currentPage.number
                  ? "none"
                  : "",
            }}
            onClick={() => {
              context.setIsPlaying(false)
              context.setEpisode(context.currentPage)
            }}
          >
            <FaPlay style={{ marginRight: 8 }} />

            {context.episode.number === context.currentPage.number
              ? "Playing"
              : "Play this episode"}
          </button>
        </div>
      </>
    )
  }
  if (context.currentPage.type === "home") {
    return (
      <>
        <HeaderH1
          style={{
            marginTop: 0,
            textShadow: "2px 2px 6px var(--color-lightblack)",
          }}
        >
          {context.currentPage.title}
        </HeaderH1>
        <HeaderH2 style={{ color: "var(--color-lightpurple)" }}>
          Work from home better.
        </HeaderH2>
        <PlatformsWrapper>
          <MainPlatformsList>
            {Platforms.map(({ ...platform }: PlatformsTypes) => {
              if (platform.image) {
                return (
                  <li key={platform.name}>
                    <a href={platform.url}>
                      <PlatformImage src={platform.image} alt={platform.name} />
                    </a>
                  </li>
                )
              }
            })}
          </MainPlatformsList>
          <PlatformList>
            {Platforms.map(({ ...platform }: PlatformsTypes) => {
              if (!platform.image) {
                return (
                  <li key={platform.name}>
                    <a href={platform.url}>{platform.name}</a>
                  </li>
                )
              }
            })}
          </PlatformList>
        </PlatformsWrapper>
      </>
    )
  }
  return (
    <>
      <HeaderH1
        style={{
          marginTop: 0,
          textShadow: "2px 2px 6px var(--color-lightblack)",
        }}
      >
        {context.currentPage.title}
      </HeaderH1>
    </>
  )
}

const HeaderContent = styled.div`
  position: relative;
  z-index: 20;
  max-width: 1180px;
  text-align: center;
  padding: 5rem 2rem 1rem;
  &.header-episode {
    @media screen and (min-width: 700px) {
      padding: 20vh 0 0;
    }
  }
  &.header-page {
    @media screen and (min-width: 700px) {
      padding: 20vh 0 15vh;
    }
  }
  &.header-home {
    @media screen and (min-width: 700px) {
      padding: 20vh 0 0;
    }
  }
`

class Header extends React.Component<HeaderProps> {
  static contextType = SiteContext
  constructor(props: HeaderProps) {
    super(props)
  }
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            desktop: file(
              relativePath: { eq: "commuteless-site-background.jpg" }
            ) {
              childImageSharp {
                fluid(quality: 90, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        `}
        render={data => {
          // Set ImageData.
          const imageData = data.desktop.childImageSharp.fluid
          return (
            <>
              <Menu />
              <HeaderWithBackground
                Tag="header"
                fluid={imageData}
                // Reset style here to handle responsive sizing
                // style={{ backgroundPosition: "center top" }}
              >
                <HeaderContent
                  className={`header-${this.context.currentPage.type}`}
                >
                  <HeaderTitleSection
                    location={this.props.location}
                    context={this.context}
                  />
                </HeaderContent>
              </HeaderWithBackground>
            </>
          )
        }}
      />
    )
  }
}

export default Header
