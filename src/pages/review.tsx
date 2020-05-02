import React from 'react'
import { withSiteData } from 'react-static'
// import { Link } from '@reach/router'
import { Episode, FMType } from '../types'
import Header from '@src/components/Header'
import Footer from '@src/components/Footer'
import styled from 'styled-components'

const Main = styled('main')`
  padding: 0 1rem;
  max-width: 990px;
`
const Content = styled('div')`
  background: #fefefe;
  color: #1d1d1d;
  margin-top: 3rem;
  font-size: 1.25rem;
  padding: 2rem;
  border-radius: 2px;
`

type Props = {
  frontmatters: FMType[]
  mostRecentEpisode: Episode
  title: string
  description: string
  myURL: string
  image: string
  episodeimage: string
  hosts: string
}
export default withSiteData(
  ({
    mostRecentEpisode,
    title,
    description,
    myURL,
    image,
    episodeimage,
    hosts,
  }: Props) => {
    return (
      <>
        <Header
          siteData={{
            title,
            description,
            myURL,
            image,
            episodeimage,
            hosts,
          }}
          mostRecentEpisode={mostRecentEpisode}
        />
        <Main>
          <h1
            style={{
              textAlign: 'center',
              fontSize: '3rem',
              margin: '2rem 0 0',
            }}
          >
            Leave a Review
          </h1>
          <Content>
            <p>
              If you've received any value from our show, we'd love to hear
              about it! Leaving a review helps the show appear for others who
              are looking for the same content you are, and it would mean the
              world to us as well.
            </p>
            <p>
              Leaving a review is pretty simple! Here are the steps for Apple
              Podcasts (more steps for other players coming soon):
            </p>
            <h3>Apple Podcasts</h3>
            <ul>
              <li>
                Open{' '}
                <strong>
                  <a
                    href="https://podcasts.apple.com/us/podcast/commuteless/id1510958925"
                    target="_blank"
                    rel="noopener"
                  >
                    Commuteless
                  </a>
                </strong>{' '}
                on your Apple Podcasts app on your iPhone.
              </li>
              <li>
                Swipe down until you see <strong>Ratings & Reviews</strong>.
              </li>
              <li>
                At the bottom of this section is a link that says{' '}
                <strong>Write a Review</strong>. Tap that link.
              </li>
              <li>
                Type in your review and hit <strong>Send</strong>!
              </li>
            </ul>
            <p>Thanks so much!</p>
            <p>- Kyle & Cory</p>
          </Content>
        </Main>
        <Footer />
      </>
    )
  },
)
