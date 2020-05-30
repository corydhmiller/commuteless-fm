import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import SiteContext from "../../SiteContext"

class Review extends React.Component<{ data: any; location: string }> {
  static contextType = SiteContext
  componentWillMount() {
    this.context.setCurrentPage({ title: "Leave a Review", type: "page" })
  }
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO
          title="Leave a Review"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <div style={{ maxWidth: "50rem", margin: "0 auto" }}>
          <p>
            If you've received any value from our show, we'd love to hear about
            it! Leaving a review helps the show appear for others who are
            looking for the same content you are, and it would mean the world to
            us as well.
          </p>
          <p>
            Leaving a review is pretty simple! Here are the steps for Apple
            Podcasts (more steps for other players coming soon):
          </p>
          <h3>Apple Podcasts</h3>
          <ul>
            <li>
              Open{" "}
              <strong>
                <a
                  href="https://podcasts.apple.com/us/podcast/commuteless/id1510958925"
                  target="_blank"
                  rel="noopener"
                >
                  Commuteless
                </a>
              </strong>{" "}
              on your Apple Podcasts app on your iPhone.
            </li>
            <li>
              Swipe down until you see <strong>Ratings & Reviews</strong>.
            </li>
            <li>
              At the bottom of this section is a link that says{" "}
              <strong>Write a Review</strong>. Tap that link.
            </li>
            <li>
              Type in your review and hit <strong>Send</strong>!
            </li>
          </ul>
          <p>Thanks so much!</p>
          <p>- Kyle & Cory</p>
        </div>
      </Layout>
    )
  }
}

export default Review
