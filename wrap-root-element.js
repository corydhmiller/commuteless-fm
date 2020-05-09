import React, { useState } from "react";

export const Player = (props) => {
  return (
    <div>
      <audio src={props.episode.episodeurl} controls></audio>
    </div>
  );
};

export const myContext = React.createContext();

const Provider = (props) => {
  const [episode, setEpisode] = useState({
    episodeurl: "https://traffic.libsyn.com/commuteless/commuteless-001.mp3",
  });
  return (
    <myContext.Provider
      value={{
        episode,
        changeEpisode: (e) => setEpisode(e),
      }}
    >
      <Player episode={episode} />
      {props.children}
    </myContext.Provider>
  );
};

export default ({ element }) => <Provider>{element}</Provider>;
