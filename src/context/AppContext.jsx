import { useState, createContext, useContext } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export const MoviesContext = createContext();

export function getContextType(type) {
  if (type === "MoviesContext") return useContext(MoviesContext);
  throw new Error(`The context ${type} must be used within AppProvider`);
}

export function AppProvider({children}) {
    const [searchSetup, setSearchSetup] = useState({type:'movie', value:''});
    const [searchResults, setSearchResults] = useState();
    const [pickedMovie, setPickedMovie] = useState();
    const [pickedMovieCast, setPickedMovieCast] = useState();
    const [pickedArtist, setPickedArtist] = useState();
    const [pickedArtistMovies, setPickedArtistMovies] = useState();
    const [trendMovies, setTrendMovies] = useState([]);
    const [cart, setCart] = useState([]);

    //**************** PROVIDED DATA *******************//
    const moviesContextProviderValue = {
      _searchSetup:[searchSetup, setSearchSetup],
      _searchResults:[searchResults, setSearchResults], //API
      _pickedMovie:[pickedMovie, setPickedMovie], //API
      _pickedMovieCast:[pickedMovieCast, setPickedMovieCast], //API
      _pickedArtist:[pickedArtist, setPickedArtist], //API
      _pickedArtistMovies: [pickedArtistMovies, setPickedArtistMovies],//API
      _trendMovies:[trendMovies, setTrendMovies], //API
      _cart:[cart, setCart],
    }
    //**************** PROVIDED DATA *******************//
    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    return (
      <PayPalScriptProvider options={{"client-id": PAYPAL_CLIENT_ID }}>
        <MoviesContext.Provider value={ moviesContextProviderValue }>
          { children }
        </MoviesContext.Provider>
      </PayPalScriptProvider>
    )
}
