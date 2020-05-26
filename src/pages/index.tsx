import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import { dateIsInFuture } from "../utils/helpers"
import styled from "styled-components"
import SiteContext from "../../SiteContext"
import BackgroundImage from "gatsby-background-image"

const LatestEpisodes = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Episode = styled(BackgroundImage)`
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  overflow: hidden;
  padding: 1rem;
  margin: 1rem 0.5rem;
  background-color: var(--color-darkpurple);
  border: 2px solid vaR(--color-purple);
  a {
    flex-grow: 1;
    color: var(--color-white);
    margin-bottom: 1rem;
  }
  &:before,
  &:after {
    background-color: black;
    border-radius: 1.25 !important;
    opacity: 0.15 !important;
  }
`

const MainSection = styled.div`
  position: relative;
  padding: 0;
  margin: 2rem auto;
  border-radius: 0.2rem;
  display: grid;
  max-width: 50rem;
  align-items: center;
  grid-template-columns: 1fr;
  @media screen and (min-width: 600px) {
    padding: 2rem 0;
    grid-template-columns: repeat(2, 1fr);
  }
  grid-column-gap: 1.5rem;
`
const HostsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  align-content: center;
  justify-items: center;
  text-align: center;
  font-size: 0.93rem;
  grid-column-gap: 1rem;
`

const HostImg = styled(Img)`
  max-width: 150px;
  border-radius: 50%;
  border: 5px solid var(--color-lightpurple);
`

interface BlogProps {
  data?: any
  location: string
}

class IndexPage extends React.Component<BlogProps> {
  static contextType = SiteContext
  componentWillMount() {
    this.context.setCurrentPage({ title: "Commuteless", type: "home" })
  }
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          description={data.site.siteMetadata.description}
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <MainSection>
          <div>
            <h3 style={{ textAlign: "center" }}>
              A show about working from home with less stress and more freedom
              so you can live life on your terms.
            </h3>
          </div>
          <div>
            <HostsDiv>
              <div>
                <HostImg fixed={data.kyle.childImageSharp.fixed} />
                <p>Kyle Adams</p>
              </div>
              <div>
                <HostImg fixed={data.cory.childImageSharp.fixed} />
                <p>Cory Miller</p>
              </div>
            </HostsDiv>
          </div>
        </MainSection>
        <h2 style={{ textAlign: "center" }}>Latest Episodes</h2>
        <LatestEpisodes>
          {posts.map(({ node }: any) => {
            // If for some reason we've loaded in an episode that is still in the future, get that garbage out of there.
            if (dateIsInFuture(node.frontmatter.date)) return

            const title = node.frontmatter.title || node.fields.slug
            const url = `/episodes${node.fields.slug}`

            return (
              <Episode
                key={node.fields.slug}
                Tag="div"
                fluid={node.frontmatter.image.childImageSharp.fluid}
                // Reset style here to handle responsive sizing
                style={{
                  backgroundSize: "cover",
                  opacity: ".2",
                  borderRadius: "",
                  backgroundColor: "",
                }}
              >
                <Link style={{ boxShadow: `none` }} to={url}>
                  {/* <Img fluid={featuredImgFluid} style={{ maxWidth: 250 }} /> */}
                  <h3 style={{ margin: 0 }}>{title}</h3>
                </Link>
                <small style={{ opacity: 0.6, fontWeight: "bold" }}>
                  {node.frontmatter.date}
                </small>
              </Episode>
            )
          })}
        </LatestEpisodes>
        <div style={{ width: "100%", textAlign: "right" }}>
          <p>
            <Link to="/episodes">View All Episodes →</Link>
          </p>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery($currentDate: Date!) {
    site {
      siteMetadata {
        title
      }
    }
    kyle: file(relativePath: { eq: "person/kyle-adams.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    cory: file(relativePath: { eq: "person/cory-miller.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMdx(
      sort: { fields: [frontmatter___number], order: DESC }
      filter: { frontmatter: { date: { lte: $currentDate } } }
      limit: 3
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
