import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import { IComicResponse } from "types/IComic.type";
import { useEffect, useState, ChangeEvent } from "react";
import { Stack, Grid, Pagination } from "@mui/material";
import CardComponent from 'dh-marvel/components/card/card.component';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { useRouter } from "next/router";
import { getComicsByPage } from 'dh-marvel/services/marvel/marvel.service';

interface Props {
    comics: IComicResponse;
}

const Index: NextPage<Props> = ({ comics }) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number | null>(null);
    const [comicsData, setComicsData] = useState<IComicResponse>();

    useEffect(() => {
        localStorage.clear();
    }, [])

    useEffect(() => {
        console.log(comics);
        
        if (currentPage !== null) {
            router.push(`/?page=${currentPage}`, undefined, { shallow: true });
            getComicsByPage(12, currentPage).then(
                (data: IComicResponse) => {
                    if (data.code === 200) {
                    setComicsData(data);
                    }
                }
            );
        }
    }, [currentPage]);

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const totalPages: number = 
    comics?.data?.total !== undefined ? Math.ceil(comics.data.total / 12) : 1;

    return (
        <>
            <Head>
                <title>DH MARVEL</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Stack
            component="section"
            maxWidth="x1"
            direction="column"
            spacing={10}
            alignItems="center"
            paddingY={15}
            paddingX={4}
            >
                <Grid container columns={3} spacing={2}>
                    { 
                    comicsData !== undefined ?
                    comicsData.data.results.map((comic, key ) => <Grid key={key} item xs={1}><CardComponent comic={comic}/></Grid>) :
                    comics?.data.results.map((comic, key) =>  <Grid key={key} item xs={1}><CardComponent comic={comic}/></Grid>)
                    }
                </Grid>
                <Pagination count={totalPages} onChange={handleChange}/>
            </Stack>
        </>
    )
}


export const getServerSideProps : GetServerSideProps = async () => {
    const comics = await getComics(0,12);
    return {props: { comics }};
}

export default Index
