import React, { useState } from "react"
import Player from "./src/components/Player"
import Header from "./src/components/Header"
import { SiteProvider } from "./SiteContext"

const Provider = (props: any) => {
  // Init the state as an empty object. Frontmatters is passed in upon "play episode"
  const [episode, setEpisode] = useState({})
  const [currentPage, setCurrentPage] = useState({})

  return (
    <SiteProvider
      value={{
        episode,
        currentPage,
        setEpisode,
        setCurrentPage,
      }}
    >
      <Header
        className="header-wrap"
        episode={episode}
        currentPage={currentPage}
      />
      <Player episode={episode} />
      {props.children}
    </SiteProvider>
  )
}

export default ({ element }: any) => <Provider>{element}</Provider>
