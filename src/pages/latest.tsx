import React from "react"
import { graphql, navigate } from "gatsby"
import { dateIsInFuture } from "../utils/helpers"

class LatestPage extends React.Component<{ data: any; location: string }> {
  render() {
    const { data } = this.props
    const posts = data.allMdx.edges

    let postArray = []
    for (const post of posts) {
      if (dateIsInFuture(post.node.frontmatter.date)) continue
      postArray.push(post.node.frontmatter.number)
    }

    const lmao = posts[posts.length - Math.max(...postArray)]

    navigate("/episodes" + lmao.node.fields.slug)

    return <></>
  }
}

export default LatestPage

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___number], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            number
          }
        }
      }
    }
  }
`
