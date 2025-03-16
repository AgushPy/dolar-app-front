import { create } from "zustand";
import { Dolar } from '../page';
import axios from 'axios';


interface UseDolarStore {
  dolarsInfo: Dolar[];
  isLoading: boolean;
  fetchDolar: () => Promise<void>;
}

export const useDolarStore = create<UseDolarStore>( ( set ) => ( {
  dolarsInfo: [],
  isLoading: false,
  fetchDolar: async () => {
    set( { isLoading: true } );
    try {
      const { data } = await axios.get<Dolar[]>( "http://localhost:3000/api/scrape/dolar" );
      set( { dolarsInfo: data } );
    } catch ( error ) {
      console.error( "Error in get data", error );
    } finally {
      set( { isLoading: false } );
    }
  },
} ) );
