import { useState, createContext, useContext } from 'react';

export const MoviesContext = createContext();

export function getContextType(type) {
  if (type === "MoviesContext") return useContext(MoviesContext);
  throw new Error(`The context ${type} must be used within AppProvider`);
}

export function AppProvider({children}) {
    const [movieSearchResults, setMovieSearchResults] = useState();
    const [pickedMovie, setPickedMovie] = useState();
    const [pickedMovieCast, setPickedMovieCast] = useState();
    const [trendMovies, setTrendMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cart, setCart] = useState([]);

    //**************** PROVIDED DATA *******************//
    const moviesContextProviderValue = {
      _movieSearchResults:[movieSearchResults, setMovieSearchResults], //API
      _pickedMovie:[pickedMovie, setPickedMovie], //API
      _pickedMovieCast:[pickedMovieCast, setPickedMovieCast], //API
      _trendMovies:[trendMovies, setTrendMovies], //API
      _searchValue:[searchValue, setSearchValue],
      _cart:[cart, setCart]
    }
    //**************** PROVIDED DATA *******************//

    return (
        <MoviesContext.Provider value={ moviesContextProviderValue }>
          { children }
        </MoviesContext.Provider>
    )
}
