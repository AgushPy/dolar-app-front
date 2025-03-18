import { create } from "zustand";
import { Dolar } from '../page';
import axios from 'axios';


interface UseDolarStore {
  dolarsInfo: Dolar[];
  isLoading: boolean;
  fetchDolar: () => Promise<void>;
}

interface ResponseServe {
  dolar: Dolar[]
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
