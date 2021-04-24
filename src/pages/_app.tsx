import "../styles/global.scss";

import { useState } from "react";

import { Header } from "../components/Header";
import { Player }  from "../components/Player";
import { PlayerContext } from "../contexts/PlayerContext";

import styles from "../styles/app.module.scss";

// Aqui eu do retorno no que vai ter em todas as paginas, ou seja template
function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }
  
  return (
    <PlayerContext.Provider value={{episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState}}>
      {/* Esse wrapper utilizei para por o player do lado do main */}
      <div className={styles.wrapper}>
        <main>
          {/* Componente Header */}
          <Header />
          {/* Carrega o conteudo da pagina */}
          <Component {...pageProps} />
        </main>
        {/* Componente Player */}
        <Player />
      </div>
    
    </PlayerContext.Provider>
  )
}

export default MyApp
