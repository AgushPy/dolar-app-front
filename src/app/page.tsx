"use client";
import styles from "./page.module.css";
import { useEffect } from 'react';
import { Button, CircularProgress, Typography, Grid, Grid2 } from '@mui/material';
import Link from 'next/link';
import { DolarCard } from './components/DolarCard';
import { useDolarStore } from './storage/useDolarStorage';

export interface Dolar {
  buyPrice: string,
  sellPrice: string,
  variation: string,
  source: string;
}


export default function Home() {

  const { dolarsInfo, isLoading, fetchDolar } = useDolarStore();


  useEffect( () => {
    fetchDolar();

    const interval = setInterval(fetchDolar, 300000);

    return () => clearInterval(interval);
  }, [] );

  return (
    <div className={ styles.page }>
      <main className={ styles.main }>
        <h1>Prices</h1>
        { isLoading ?
          ( <CircularProgress sx={{ color: 'white' }} /> )
          :
          (
            <Grid2 container spacing={ 3 } sx={ { mt: 3, justifyContent: "center" } }>
              { dolarsInfo.length === 0 ? 
               <Typography sx={{ color: "white", fontSize: 20}}>No se encuentran elementos</Typography>
              :
              dolarsInfo?.map( ( dolar, index ) => (
                <DolarCard dolar={ dolar } key={ index } />
              ) ) }
            </Grid2>

          )
        }


      </main>
      <footer className={ styles.footer }>
        <Typography sx={{ color: "white", fontSize: 16 }}>
          Make by Agus. You can see my work in my github profile
        </Typography>
        <Link href={ 'https://github.com/AgushPy' } passHref>
          <Button size="small" variant="text" color="primary">
            AgushPy
          </Button>
        </Link>
      </footer>
    </div>
  );
}
