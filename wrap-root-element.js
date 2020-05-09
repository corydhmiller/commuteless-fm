import React, { useState } from "react";
import Player from './src/components/Player'

export const myContext = React.createContext();

const Provider = (props) => {
  // Init the state as an empty object. Frontmatters is passed in upon "play episode"
  const [episode, setEpisode] = useState({});
  return (
    <myContext.Provider
      value={{
        episode,
        changeEpisode: (e) => setEpisode(e)
      }}
    >
      <Player episode={episode} />
      {props.children}
    </myContext.Provider>
  );
};

export default ({ element }) => <Provider>{element}</Provider>;
