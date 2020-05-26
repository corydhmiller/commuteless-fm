import React, { useState } from "react"
import Player from "./src/components/Player"
import Header from "./src/components/Header"
import { SiteProvider } from "./SiteContext"

const App = (props: any) => {
  const [episode, setEpisode] = useState({})
  const [currentPage, setCurrentPage] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <SiteProvider
      value={{
        episode,
        currentPage,
        setEpisode,
        setCurrentPage,
        isPlaying,
        setIsPlaying,
      }}
    >
      <Header episode={episode} currentPage={currentPage} />
      <Player
        episode={episode}
        isPlaying={isPlaying}
        onPlayPause={(a: boolean) => {
          setIsPlaying(a)
        }}
      />
      {props.children}
    </SiteProvider>
  )
}

export default ({ element }: any) => <App>{element}</App>
