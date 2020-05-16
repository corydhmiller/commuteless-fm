import React, { useState } from "react"
import Player from "./src/components/Player"
import Header from "./src/components/Header"

export const siteContext = React.createContext(null)

interface Props {
  episode?: any
  children?: any
  currentPage: {
    pageTitle: string
    url: string
  }
}

const Provider = (props: Props) => {
  // Init the state as an empty object. Frontmatters is passed in upon "play episode"
  const [episode, setEpisode] = useState({})
  const [currentPage, setCurrentPage] = useState({})

  return (
    <siteContext.Provider
      value={{
        episode,
        changeEpisode: (e: React.SetStateAction<{}>) => setEpisode(e),
        currentPage: (e: React.SetStateAction<{}>) => setCurrentPage(e),
      }}
    >
      <Header
        className="header-wrap"
        episode={episode}
        currentPage={currentPage}
      />
      <Player episode={episode} />
      {props.children}
    </siteContext.Provider>
  )
}

export default ({ element }: any) => <Provider>{element}</Provider>
