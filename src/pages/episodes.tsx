import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { dateIsInFuture } from "../utils/helpers"
import SiteContext from "../../SiteContext"
import Img from "gatsby-image"
import styled from "styled-components"

const Episode = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 3rem;
`

const EpisodeImage = styled(Img)`
  max-width: 250px;
  border-radius: 1rem;
`

class EpisodesPage extends React.Component<{ data: any; location: any }> {
  static contextType = SiteContext
  componentDidMount() {
    this.context.setCurrentPage({ title: "All Episodes", type: "page" })
  }
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {posts.map(({ node }: any) => {
          // If for some reason we've loaded in all of the posts (why, GraphQL? Why?) just show posts that are today's date or beyond
          if (dateIsInFuture(node.frontmatter.date)) return

          const title = node.frontmatter.title || node.fields.slug
          const url = `/episodes${node.fields.slug}`
          return (
            <Episode key={node.fields.slug}>
              <EpisodeImage
                fluid={node.frontmatter.image.childImageSharp.fluid}
              />
              <div className="">
                <h2 style={{ marginTop: 0 }}>
                  <Link style={{ boxShadow: `none` }} to={url}>
                    {title}
                  </Link>
                </h2>
                <small style={{ opacity: 0.7 }}>{node.frontmatter.date}</small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description,
                  }}
                />
              </div>
            </Episode>
          )
        })}
      </Layout>
    )
  }
}

export default EpisodesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___episode], order: DESC }) {
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
                fluid(maxWidth: 200) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                }
              }
            }
          }
        }
      }
    }
  }
`
