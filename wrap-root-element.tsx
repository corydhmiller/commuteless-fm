import React, { useState } from "react"
import Player from "./src/components/Player";

export const myContext = React.createContext(null)

interface Props {
  episode?: any
  children?: any
}

const Provider = (props: Props) => {
  // Init the state as an empty object. Frontmatters is passed in upon "play episode"
  const [episode, setEpisode] = useState({})
  return (
    <myContext.Provider
      value={{
        episode,
        changeEpisode: (e: React.SetStateAction<{}>) => setEpisode(e),
      }}
    >
      <Player episode={episode} />
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }: any) => <Provider>{element}</Provider>
