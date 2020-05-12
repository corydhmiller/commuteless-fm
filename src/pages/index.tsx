import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import { dateIsInFuture } from "../utils/helpers"
import styled from "styled-components"

const LatestEpisodes = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Episode = styled.div`
  background: var(--color-black);
  // background-color: var(--color-lightblack);
  padding: 1rem;
  margin: 0.5rem;
`

const MainSection = styled.div`
  position: relative;
  padding: 1rem 2rem;
  margin-top: 2rem;
  border-radius: 0.2rem;
  background: var(--color-white);
  color: var(--color-black);
`

interface BlogProps {
  data?: any
  location: string
}

class BlogIndex extends React.Component<BlogProps> {
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
          <h3 style={{ textAlign: "center" }}>
            A show about working from home with less stress and more freedom so
            you can live life on your terms.
          </h3>
          <p>
            Welcome to Commuteless.fm! We're excited to help you on your journey
            of working from home.
          </p>
          <h4>The Hosts</h4>
          <div>
            <p>Kyle Adams</p>
          </div>
          <div>
            <p>Cory Miller</p>
          </div>
        </MainSection>
        <h2 style={{ marginBottom: 0 }}>Latest Episodes</h2>
        <LatestEpisodes>
          {posts.map(({ node }: any) => {
            // If for some reason we've loaded in an episode that is still in the future, get that garbage out of there.
            if (dateIsInFuture(node.frontmatter.date)) return

            const title = node.frontmatter.title || node.fields.slug
            const url = `/episodes${node.fields.slug}`
            return (
              <Episode key={node.fields.slug}>
                <Link style={{ boxShadow: `none` }} to={url}>
                  {/* <Img fluid={featuredImgFluid} style={{ maxWidth: 250 }} /> */}
                  <h3 style={{ margin: 0 }}>{title}</h3>
                </Link>
                <small>{node.frontmatter.date}</small>
              </Episode>
            )
          })}
        </LatestEpisodes>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query HomeQuery($currentDate: Date!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___episode], order: DESC }
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
