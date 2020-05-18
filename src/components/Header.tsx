import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import AppleImage from "../../content/images/badges/apple.svg"
import SpotifyImage from "../../content/images/badges/spotify.svg"
import GoogleImage from "../../content/images/badges/google.svg"
import styled from "styled-components"
import BackgroundImage from "gatsby-background-image"
import SiteContext from "../../SiteContext"

// Determine if the page is home or not

const isHome = () => {
  return location.pathname === "/"
}

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

const MenuStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: var(--color-red);
  z-index: 555;
  padding: 1.5rem 3rem 3rem 1.5rem;
  border-bottom-right-radius: 8rem;
  box-shadow: 4px 4px 10px var(--color-black);
  position: fixed;
  width: 2rem;
  height: 1rem;
  transition: 0.35s all ease-in-out;
  &[data-menu-toggled="true"] {
    padding: 0.5rem 0 0 0.5rem;
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: rgba(29, 29, 29, 0.97);
    .menu-content {
      display: flex;
      opacity: 1;
    }
  }
  .menu-toggle {
    cursor: pointer;
  }
`

const MenuContent = styled.div`
  height: 100%;
  width: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.25s all ease;
`
const MenuList = styled.ul`
  width: 100%;
  list-style-type: none;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  & li {
    padding: 1rem 0;
  }
`

const HeaderH1 = styled.h1`
  margin: 0;
  font-weight: 400;
  font-size: 3rem;
  @media screen and (min-width: 700px) {
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
      </>
    )
  }
  if (isHome()) {
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
  &.header-episode{
    @media screen and (min-width: 700px) {
      padding: 20vh 0 5vh;
    }
  }
  &.header-page {
    @media screen and (min-width: 700px) {
      padding: 20vh 0 15vh;
    }
  }
  &.header-home {
    @media screen and (min-width: 700px) {
      padding: 30vh 0 0;
    }
  }
`

const Menu = () => {
  const [toggled, setToggled] = React.useState(false)

  return (
    <MenuStyled className="menu" data-menu-toggled={toggled}>
      <div
        className="menu-toggle"
        onClick={() => {
          setToggled(!toggled)
        }}
      >
        Menu
      </div>
      <MenuContent className="menu-content">
        <MenuList>
          <li>
            <Link
              to="/"
              onClick={() => {
                setToggled(!toggled)
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/episodes"
              onClick={() => {
                setToggled(!toggled)
              }}
            >
              All Episodes
            </Link>
          </li>
          <li>Contact Us</li>
          <li>Sponsor the Show</li>
        </MenuList>
      </MenuContent>
    </MenuStyled>
  )
}

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
                  <HeaderTitleSection context={this.context} />
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
