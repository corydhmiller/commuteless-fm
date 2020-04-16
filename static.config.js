import axios from 'axios'
import path from 'path'
import { mkDir, mkFile } from './fs'
const fs = require('fs')
import { buildFeed, grabContents } from 'podcats'

/// config
const myURL = 'https://commuteless.fm'

const description =
  'A show about working from home with less stress and more freedom so you can live life on your terms.'
const image = 'images/commuteless-artwork.jpg'
const ghURL = 'https://github.com/corydhmiller/commuteless-fm'
const rss = myURL + '/rss/index.xml'
const itURL =
  'https://itunes.apple.com/us/podcast/this-week-in-r-reactjs/id1448641675?mt=2&uo=4'
const spotifyURL = 'https://open.spotify.com/show/null'
const googlepodURL =
  'https://www.google.com/podcasts?feed=null'
const overcastURL =
  'https://overcast.fm/itunes1448641675/null'

const contentFolder = 'content'
const author = {
  name: 'Commuteless',
  email: 'mail@commuteless.fm',
  link: 'https://commuteless.fm',
}
const feedOptions = {
  // blog feed options
  title: 'Commuteless',
  description,
  link: myURL,
  id: myURL,
  copyright: 'copyright REACTSTATICPODCAST_YOURNAMEHERE',
  feedLinks: {
    atom: safeJoin(myURL, 'atom.xml'),
    json: safeJoin(myURL, 'feed.json'),
    rss: safeJoin(myURL, 'rss'),
  },
  author,
}
const iTunesChannelFields = {
  // itunes options
  summary: 'Commuteless',
  author: author.name,
  keywords: ['Technology'],
  categories: [
    { cat: 'Technology' },
    { cat: 'Technology', child: 'Tech News' },
  ],
  image,
  explicit: false,
  owner: author,
  type: 'episodic',
}

// preprocessing'
const filenames = fs.readdirSync(contentFolder).reverse() // reverse chron
const filepaths = filenames.map(file =>
  path.join(process.cwd(), contentFolder, file),
)
const contents = grabContents(filepaths, myURL)
const frontmatters = contents.map(c => c.frontmatter)
mkDir('/public/rss/')

// generate HTML
export default {
  plugins: [
    'react-static-plugin-styled-components',
    'react-static-plugin-typescript',
  ],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  siteRoot: myURL,
  getSiteData: async () => {
    // generate RSS
    let feed = await buildFeed(
      contents,
      myURL,
      author,
      feedOptions,
      iTunesChannelFields,
    )
    mkFile('/public/rss/index.xml', feed.rss2())
    return {
      title: 'Commuteless',
      description,
      rss,
      frontmatters,
      ghURL,
      myURL,
      image,
      mostRecentEpisode: contents[0], // necessary evil to show on '/'
      subscribeLinks: [
        { type: 'iTunes', url: itURL },
        { type: 'RSS', url: rss },
        { type: 'Spotify', url: spotifyURL },
        { type: 'GooglePlay', url: googlepodURL },
        { type: 'Overcast', url: overcastURL },
      ],
    }
  },
  getRoutes: async () => {
    return [
      {
        path: 'episode',
        getData: () => ({
          contents,
        }),
        children: contents.map(content => ({
          path: `/${content.frontmatter.slug}`,
          component: 'src/pages/episode',
          getData: () => ({
            content,
            myURL,
          }),
        })),
      },
    ]
  },
}

function safeJoin(a, b) {
  /** strip starting/leading slashes and only use our own */
  let a1 = a.slice(-1) === '/' ? a.slice(0, a.length - 1) : a
  let b1 = b.slice(0) === '/' ? b.slice(1) : b
  return `${a1}/${b1}`
}
