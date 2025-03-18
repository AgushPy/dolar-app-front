import { create } from "zustand";
import { Dolar, DolarHistorical } from '../page';
import axios from 'axios';


interface UseDolarStore {
  dolarsInfo: Dolar[];
  isLoading: boolean;
  fetchDolar: () => Promise<void>;
}

interface useDolarHistoricalStore {
  dolarHistorical: DolarHistorical[];
  isLoading: boolean;
  fetchDolarHistorico: () => Promise<void>;
}

interface ResponseServe {
  dolar: Dolar[]
}

interface ResponseServeHistorical {
  dolarHistorical: DolarHistorical[]
}

export const useDolarStore = create<UseDolarStore>( ( set ) => ( {
  dolarsInfo: [],
  isLoading: false,
  fetchDolar: async () => {
    set( { isLoading: true } );
    try {
      const { data } = await axios.get<ResponseServe>(  `${process.env.NEXT_PUBLIC_API_URL}/scrape/dolar`  );
      set( { dolarsInfo: data?.dolar } );
    } catch ( error ) {
      console.error( "Error in get data", error );
    } finally {
      set( { isLoading: false } );
    }
  },
} ) );

export const useDolarHistoricoStore = create<useDolarHistoricalStore>( ( set ) => ( {
  dolarHistorical: [],
  isLoading: false,
  fetchDolarHistorico: async () => {
    set( { isLoading: true } );
    try {
      const { data } = await axios.get<ResponseServeHistorical>(  `${process.env.NEXT_PUBLIC_API_URL}/scrape/dolarHistorical`  );
      set( { dolarHistorical: data.dolarHistorical } );
    } catch ( error ) {
      console.error( "Error in get data", error );
    } finally {
      set( { isLoading: false } );
    }
  },
} ) );
