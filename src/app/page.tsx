"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Button, CircularProgress, Typography, Grid, LinearProgress } from "@mui/material";
import Link from "next/link";
import { DolarCard } from "./components/DolarCard";
import { useDolarStore } from "./storage/useDolarStorage";
import { useDolarHistoricoStore } from "./storage/useDolarStorage";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from 'dayjs/plugin/customParseFormat';


export interface Dolar {
  buyPrice: string;
  sellPrice: string;
  variation: string;
  source: string;
  sourcePlainText: string;
}

export interface DolarHistorical extends Dolar {
  hour: string;
}


const UltimaCotizacion = ({ ultimaCotizacion }: { ultimaCotizacion: DolarHistorical }) => {
  return (
    <Typography sx={{ color: "white", fontSize: 16 }}>
      Última cotización realizada según {ultimaCotizacion.sourcePlainText}: realizada {ultimaCotizacion.hour} Compra: {ultimaCotizacion.buyPrice}, Venta: {ultimaCotizacion.sellPrice}
    </Typography>
  );
};


export default function Home() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500); // Cambia cada 2.5 segundos

    return () => clearInterval(interval);
  }, []);

  const { dolarsInfo, isLoading, fetchDolar } = useDolarStore();
  const { dolarHistorical, isLoading: isLoadingHistorical, fetchDolarHistorico } =
    useDolarHistoricoStore();

  const loadingMessages = [
    "🔎 Buscando la mejor cotización para vos...",
    "💸 Analizando el mercado en tiempo real...",
    "📊 Comparando precios en bancos y casas de cambio...",
    "💰 Calculando la mejor opción para tu bolsillo...",
    "📉 Viendo si sube o baja… paciencia 🤞",
    "🔄 Actualizando los valores al segundo...",
    "🏦 Consultando las cotizaciones oficiales y paralelas...",
    "🚀 Esperando el próximo movimiento del dólar...",
    "📡 Conectando con los datos más recientes...",
    "🤯 Tratando de entender este mercado loco...",
  ];

  useEffect(() => {
    fetchDolar();
    fetchDolarHistorico(); // Ahora también trae el dólar histórico

    const interval = setInterval(() => {
      fetchDolar();
      fetchDolarHistorico();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const ultimaCotizacion = dolarHistorical.length > 0 ? dolarHistorical : [];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Cotización Dólar Histórico</h1>
        {isLoadingHistorical ? (
          <CircularProgress color="secondary" />
        ) : (
          ultimaCotizacion.length >= 1 && ultimaCotizacion.map((cotizacion, index) => (<UltimaCotizacion ultimaCotizacion={cotizacion} key={index}/>))
        )}

        <h1>Cotización</h1>
        {isLoading ? (
          <div style={{ width: "100%", padding: "10px", textAlign: "center" }}>
            <LinearProgress color="secondary" />
            <div style={{ marginTop: 20, height: 30 }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  style={{ fontSize: "16px", color: "#555", fontWeight: "500" }}
                >
                  {loadingMessages[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <Grid container spacing={3} sx={{ mt: 3, justifyContent: "center" }}>
            {dolarsInfo.length === 0 ? (
              <Typography sx={{ color: "white", fontSize: 20 }}>
                No se encuentran elementos
              </Typography>
            ) : (
              dolarsInfo.map((dolar, index) =>
                Object.keys(dolar).length !== 0 ? <DolarCard dolar={dolar} key={index} /> : null
              )
            )}
          </Grid>
        )}
      </main>
      <footer className={styles.footer}>
        <Typography sx={{ color: "white", fontSize: 16 }}>
          Make by Agus. You can see my work in my github profile
        </Typography>
        <Link href={"https://github.com/AgushPy"} passHref>
          <Button size="small" variant="text" color="secondary">
            AgushPy
          </Button>
        </Link>
      </footer>
    </div>
  );
}
