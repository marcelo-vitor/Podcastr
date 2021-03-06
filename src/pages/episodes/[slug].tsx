import { ptBR } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './episode.module.scss';
import { usePlayer } from '../../contexts/PlayerContext';
import Head from 'next/head';

type Episode = {
    id: string,
    title: string,
    members: string,
    publishedAt: string,
    thumbnail: string,
    duration: number,
    durationAsString: string,
    url: string,
    description: string,
}

type EpisodeProps = {
    episode
}


export default function Episode({ episode }: EpisodeProps) {

    const { play } = usePlayer();

    return (
        <div className={styles.container}>
            <Head>
                <title>
                    {episode.title} | Podcastr
                </title>
            </Head>
            <div className={styles.episode}>
                <div className={styles.thumbnailContainer}>
                    <Link href={'/'}>
                        <button type="button">
                            <img src="/arrow-left.svg" alt="Voltar" />
                        </button>
                    </Link>
                    <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />
                    <button type="button">
                        <img src="/play.svg" alt="Tocar episódio" onClick={() => {play(episode)}}/>
                    </button>
                </div>

                <header>
                    <h1>{episode.title}</h1>
                    <span>{episode.members}</span>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                </header>

                <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    // Pegar parametro pelo contexto ctx
    const { slug } = ctx.params;
    //marcelo-vitor/podcast-api/
    const { data } = await api.get(`marcelo-vitor/podcast-api/episodes/${slug}`)

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        duration: data.file.duration,
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
    }


    return {
        props: {
            episode,
        }, //
        revalidate: 60 * 60 * 24 // 24 hours
    }
}