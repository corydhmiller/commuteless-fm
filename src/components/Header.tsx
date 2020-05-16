import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import AppleImage from "../../content/images/badges/apple.svg"
import SpotifyImage from "../../content/images/badges/spotify.svg"
import GoogleImage from "../../content/images/badges/google.svg"
import styled from "styled-components"
import BackgroundImage from "gatsby-background-image"

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
  title: string
  episode?: any
}

class Header extends React.Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props)
  }
  render() {
    return (
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
              className="header-wrap"
              fluid={imageData}
              backgroundColor={`#040e18`}
              // Reset style here to handle responsive sizing
              style={{ backgroundSize: "" }}
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
                    Commuteless
                  </Link>
                </HeaderH1>
                <HeaderH2 style={{ color: "var(--color-lightpurple)" }}>
                  Work from home better.
                </HeaderH2>
                <PlatformsWrapper>
                  <MainPlatformsList>
                    {Platforms.map(({ ...props }: PlatformsTypes) => {
                      if (props.image) {
                        return (
                          <li key={props.name}>
                            <a href={props.url}>
                              <PlatformImage
                                src={props.image}
                                alt={props.name}
                              />
                            </a>
                          </li>
                        )
                      }
                    })}
                  </MainPlatformsList>
                  <PlatformList>
                    {Platforms.map(({ ...props }: PlatformsTypes) => {
                      if (!props.image) {
                        return (
                          <li key={props.name}>
                            <a href={props.url}>{props.name}</a>
                          </li>
                        )
                      }
                    })}
                  </PlatformList>
                </PlatformsWrapper>
              </div>
            </BackgroundImage>
          )
        }}
      />
    )
  }
}

// const Header = styled(BackgroundSection)`
//   display: grid;
//   align-items: center;
//   justify-content: center;
//   padding: 5rem 2rem;
//   @media screen and (min-width: 480px) {
//     padding: 5rem 2rem 7rem;
//   }
// `

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
  li {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`

export default Header
