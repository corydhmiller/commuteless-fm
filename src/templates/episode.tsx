import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from "gatsby-image"
import { FaPlay } from "react-icons/fa"
import SiteContext, { SiteConsumer } from "../../SiteContext"

const EpisodeHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 1rem;
  margin-bottom: 2rem;
  @media screen and (min-width: 750px) {
    grid-template-columns: 400px 1fr;
  }
`

const FeaturedImage = styled.div`
  border-radius: 1rem;
  overflow: hidden;
`

interface BlogPostTypes {
  data: any
  pageContext: any
  location: string
}

class BlogPostTemplate extends React.Component<BlogPostTypes> {
  static contextType = SiteContext
  constructor(props: BlogPostTypes) {
    super(props)
  }
  componentDidMount() {
    const post = this.props.data.mdx
    this.context.setCurrentPage({
      title: post.frontmatter.title,
      image: post.frontmatter.image,
      type: "episode",
      hosts: post.frontmatter.hosts,
      date: post.frontmatter.date,
    })
  }
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const featuredImgFluid = post.frontmatter.image.childImageSharp.fluid

    return (
      <SiteConsumer>
        {(context: any) => (
          <React.Fragment>
            <Layout location={this.props.location} title={siteTitle}>
              <SEO
                description={post.excerpt}
                keywords={[`commuteless`]}
                title={post.frontmatter.title}
              />
              <EpisodeHeader>
                <FeaturedImage>
                  <Img fluid={featuredImgFluid} />
                </FeaturedImage>
                <div style={{ padding: "0 1rem 2rem" }}>
                  <button
                    style={{
                      display:
                        context.episode.episode === post.frontmatter.episode
                          ? "none"
                          : "",
                    }}
                    onClick={() => {
                      context.setEpisode(post.frontmatter)
                    }}
                  >
                    <FaPlay style={{ marginRight: 8 }} />

                    {context.episode.episode === post.frontmatter.episode
                      ? "Playing"
                      : "Play this episode"}
                  </button>
                  <h2>Shownotes</h2>
                  <div>
                    <MDXRenderer>{post.body}</MDXRenderer>
                  </div>
                </div>
              </EpisodeHeader>

              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                  marginTop: "5rem",
                }}
              >
                <li>
                  {previous && (
                    <Link to={`/episodes${previous.fields.slug}`} rel="prev">
                      ← Prev Episode
                    </Link>
                  )}
                </li>
                <li>
                  {next && (
                    <Link to={`/episodes${next.fields.slug}`} rel="next">
                      Next Episode →
                    </Link>
                  )}
                </li>
              </ul>
            </Layout>
          </React.Fragment>
        )}
      </SiteConsumer>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        episode
        date(formatString: "MMMM DD, YYYY")
        hosts
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
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
        audiourl
        hosts
        description
      }
      body
    }
  }
`
