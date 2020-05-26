import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component<{ location: string }> {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="404: Not Found" keywords={[`commuteless`]} />
        <h1>Not Found</h1>
        <p>
          Whoops! Sorry about that. Doesn't look that we've got that page up
          yet.
        </p>
        <p>
          Maybe try heading <Link to="/">back to the homepage?</Link>
        </p>
      </Layout>
    )
  }
}

export default NotFoundPage
