import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from "gatsby-image"
import SiteContext from "../../SiteContext"

const EpisodeHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  @media screen and (min-width: 750px) {
    grid-template-columns: 300px 1fr;
  }
`

const FeaturedImage = styled.div`
  border-radius: 1rem;
  max-width: 250px;
  margin-bottom: 1rem;
`
const Shownotes = styled.div`
  padding: 0 1rem 2rem;
  @media screen and (max-width: 749px) {
    order: 2;
  }
`
const Subnav = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1180px;
  margin: 2rem auto;
  padding: 0 1rem;
  .subnav-link {
    flex-grow: 1;
    &:nth-child(2) {
      text-align: right;
    }
  }
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
      type: "episode",
      ...post.frontmatter,
    })
  }
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const featuredImgFluid = post.frontmatter.image.childImageSharp.fluid

    return (
      <>
        <SEO
          description={post.frontmatter.description}
          keywords={[`commuteless`]}
          title={post.frontmatter.title}
          image={post.frontmatter.image.childImageSharp.fluid.src}
        />
        <Subnav>
          <div className="subnav-link">
            {previous && (
              <Link to={`/episodes${previous.fields.slug}`} rel="prev">
                ← Prev Episode
              </Link>
            )}
          </div>
          <div className="subnav-link">
            {next && (
              <Link to={`/episodes${next.fields.slug}`} rel="next">
                Next Episode →
              </Link>
            )}
          </div>
        </Subnav>
        <Layout location={this.props.location} title={siteTitle}>
          <EpisodeHeader>
            <FeaturedImage>
              <Img fluid={featuredImgFluid} />
            </FeaturedImage>
            <Shownotes>
              <h2 style={{ marginTop: 0 }}>Shownotes</h2>
              <div>
                <MDXRenderer>{post.body}</MDXRenderer>
              </div>
            </Shownotes>
          </EpisodeHeader>
        </Layout>
      </>
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
        number
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
