import { useState, createContext, useContext } from 'react';

export const MoviesContext = createContext();

export function getContextType(type = 'no-context') {
  let context; 
  if (type == "MoviesContext") context = useContext(MoviesContext);
  if (!context) throw new Error(`The context ${type} must be used within AppProvider`);
  return context;
}

export function AppProvider({children}) {
    let [moviesArr, setMoviesArr] = useState();
    //**************** PROVIDED DATA *******************//
    const moviesContextProviderValue = {
      moviesArr
    }
    //**************** PROVIDED DATA *******************//
    return (
        <MoviesContext.Provider value={ moviesContextProviderValue }>
          { children }
        </MoviesContext.Provider>
    )
}
