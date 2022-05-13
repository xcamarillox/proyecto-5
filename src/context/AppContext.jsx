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
    //**************** PROVIDED DATA *******************//
    const moviesContextProviderValue = {
      _movieSearchResults:[movieSearchResults, setMovieSearchResults],
      _pickedMovie:[pickedMovie, setPickedMovie],
      _pickedMovieCast:[pickedMovieCast, setPickedMovieCast]
    }
    //**************** PROVIDED DATA *******************//
    return (
        <MoviesContext.Provider value={ moviesContextProviderValue }>
          { children }
        </MoviesContext.Provider>
    )
}
