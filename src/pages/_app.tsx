import "../styles/global.scss";

import { Header } from "../components/Header";
import { Player }  from "../components/Player";

import styles from "../styles/app.module.scss";
import { PlayerContextProvider } from "../contexts/PlayerContext";

// Aqui eu do retorno no que vai ter em todas as paginas, ou seja template
function MyApp({ Component, pageProps }) {

  
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
