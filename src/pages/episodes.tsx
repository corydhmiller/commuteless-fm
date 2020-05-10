import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { dateIsInFuture } from "../utils/helpers"

class BlogIndex extends React.Component<{ data: any; location: any }> {
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
            <div key={node.fields.slug}>
              <h3>
                <Link style={{ boxShadow: `none` }} to={url}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

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
          }
        }
      }
    }
  }
`
