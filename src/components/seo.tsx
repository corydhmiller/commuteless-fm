import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import defaultOpenGraphImage from "../../content/images/commuteless-artwork.jpg"
interface SEOProps {
  description?: string
  lang?: `en`
  meta?: any
  keywords?: string[]
  title?: string
  image?: string
}

function SEO({ description, lang, keywords, title, image }: SEOProps) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const ogImageUrl = data.site.siteMetadata.siteUrl + (image || defaultOpenGraphImage)
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s - ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:site`,
                content: '@Commutelessfm',
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                property: `og:image`,
                content: ogImageUrl,
              },
              {
                property: `twitter:image`,
                content: ogImageUrl,
              },
              {
                property: `image`,
                content: ogImageUrl,
              },
            ].concat(
              keywords.length > 0
                ? {
                    name: `keywords`,
                    content: keywords.join(`, `),
                  }
                : []
            )}
          />
        )
      }}
    />
  )
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
        siteImage
      }
    }
  }
`
