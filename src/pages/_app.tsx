import Header from "../components/Header";
import Player from "../components/Player";

import "../styles/global.scss";

import styles from "../styles/app.module.scss";

// Aqui eu do retorno no que vai ter em todas as paginas, ou seja template
function MyApp({ Component, pageProps }) {
  return (
    // Esse wrapper utilizei para por o player do lado do main
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
  )
}

export default MyApp
