import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from "gatsby-image"
import { myContext } from "../../wrap-root-element"

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  margin-bottom: 2rem;
  @media screen and (min-width: 750px) {
    grid-template-columns: 250px 1fr;
  }
`

interface BlogPostTypes {
  data: any
  pageContext: any
  location: string
}

class BlogPostTemplate extends React.Component<BlogPostTypes> {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const featuredImgFluid = post.frontmatter.image.childImageSharp.fluid

    return (
      <myContext.Consumer>
        {(context: any) => (
          <React.Fragment>
            <Layout location={this.props.location} title={siteTitle}>
              <SEO
                description={post.excerpt}
                keywords={[`commuteless`]}
                title={post.frontmatter.title}
              />
              <Header>
                <div>
                  <Img fluid={featuredImgFluid} />
                </div>
                <div style={{ padding: "1rem 2rem" }}>
                  <h1 style={{ margin: 0 }}>{post.frontmatter.title}</h1>
                  <p style={{ fontSize: "1.5rem" }}>{post.frontmatter.hosts}</p>
                </div>
              </Header>
              <button
                onClick={() => {
                  context.changeEpisode(post.frontmatter)
                }}
              >
                Play this episode
              </button>
              <p>{post.frontmatter.date}</p>
              <MDXRenderer>{post.body}</MDXRenderer>

              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                }}
              >
                <li>
                  {previous && (
                    <Link to={`/episodes${previous.fields.slug}`} rel="prev">
                      ← {previous.frontmatter.title}
                    </Link>
                  )}
                </li>
                <li>
                  {next && (
                    <Link to={`/episodes${next.fields.slug}`} rel="next">
                      {next.frontmatter.title} →
                    </Link>
                  )}
                </li>
              </ul>
            </Layout>
          </React.Fragment>
        )}
      </myContext.Consumer>
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
            fluid(maxWidth: 500) {
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
