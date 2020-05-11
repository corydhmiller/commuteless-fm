import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import "../styles/app.scss"
import "../styles/header.scss"
import AppleImage from "../images/badges/apple.svg"
import SpotifyImage from "../images/badges/spotify.svg"
import GoogleImage from "../images/badges/google.svg"
import styled from "styled-components"
import BackgroundImage from "gatsby-background-image"

const BackgroundSection = ({
  className,
  title,
}: {
  className: string
  title: string
}) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "commuteless-banner.jpg" }) {
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
        <BackgroundImage
          Tag="header"
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
        >
          <div style={{ maxWidth: 1180, textAlign: "center" }}>
            <HeaderH1
              style={{
                marginTop: 0,
              }}
            >
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                {title}
              </Link>
            </HeaderH1>
            <HeaderH2 style={{ color: "var(--color-lightpurple)" }}>
              Work from home better.
            </HeaderH2>
            <PlatformsWrapper>
              <PlatformList>
                {Platforms.map(
                  ({
                    name,
                    url,
                    image,
                  }: {
                    name: string
                    url: string
                    image?: string
                  }) => {
                    if (image) {
                      return (
                        <li key={name}>
                          <a href={url}>
                            <PlatformImage src={image} alt={name} />
                          </a>
                        </li>
                      )
                    }
                    return (
                      <li key={title}>
                        <a href={url}>{title}</a>
                      </li>
                    )
                  }
                )}
              </PlatformList>
            </PlatformsWrapper>
          </div>
        </BackgroundImage>
      )
    }}
  />
)

const HeaderH1 = styled.h1`
  margin: 0;
`
const HeaderH2 = styled.h2`
  margin: 0;
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
  margin-top: 1.5rem;
  list-style-type: none;
  li {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`

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
  // {
  //   name: "TuneIn",
  //   url: "http://tun.in/pjQHm",
  // },
  // {
  //   name: "Stitcher",
  //   url: "https://www.stitcher.com/podcast/commuteless",
  // },
  // {
  //   name: "YouTube",
  //   url: "https://www.youtube.com/channel/UCeisEao_HIiBETm4aK_ivVg",
  // },
  // {
  //   title: "RSS",
  //   url: "https://lynx.commuteless.fm/rss",
  // },
]

interface LayoutProps {
  location: string
  title?: string
  children?: any
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const {
      //  location,
      title,
      children,
    } = this.props

    return (
      <>
        <BackgroundSection className="header-wrap" title={title} />
        <main>
          {children}
          <footer>© {new Date().getFullYear()}. All rights reserved.</footer>
        </main>
      </>
    )
  }
}

export default Layout
