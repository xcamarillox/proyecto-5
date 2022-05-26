import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ConfigProvider } from 'antd';

import { getContextType } from "../context/AppContext";
import Home from "./Home";
import Navbar from "./Navbar";
import SignForm from "./SignForm";
import CartList from "./CartList";
import MoviesFilterList from "./MoviesFilterList";
import ArtistFilterList from "./ArtistFilterList";
import MovieCardFull from "./MovieCardFull";
import ArtistCardFull from "./ArtistCardFull.jsx";


const App =  () => {
    const [selectedPath, setSelectedPath] = useState('home');
    const location = useLocation();
    const { 
        _searchResults:[searchResults],
        _cart:[cart]
    } = getContextType('MoviesContext');

    useEffect(()=>{
        ConfigProvider.config({
            theme: {
                primaryColor: '#2E3696',
              },
          });
    },[])

    useEffect(()=>{
        let locationSplit = location.pathname.split('/')[1];
        //console.log('location', location, locationSplit);
        if (locationSplit == 'signup' || locationSplit == 'signin') locationSplit = 'sign'
        if (locationSplit != selectedPath) setSelectedPath(locationSplit)
    }, [location])

    return (
        <ConfigProvider>
            <Navbar selectedPath={selectedPath} />
            <Routes>
                <Route path="home" element={ <Home /> }/>
                <Route path="filter" element={ 
                    searchResults ? 
                        searchResults.type == 'movie' ?
                            <MoviesFilterList moviesArr={searchResults.results} />
                            :<ArtistFilterList artistArr={searchResults.results} />
                        :<Navigate to='home'/>
                }/>
                <Route path="movie/:movie_id" element={ <MovieCardFull /> }/>
                <Route path="signup" element={ <SignForm /> }/>
                <Route path="signin" element={ <SignForm /> }/>
                <Route path="cart" element={ 
                    cart.length > 0 ?
                        <CartList />
                        :<Navigate to='home'/>
                }/>
                <Route path="artist/:artist_id" element= { <ArtistCardFull  />}/>
                <Route path="*" element={<Navigate to='home'/>} />
            </Routes>
        </ConfigProvider>
    );
}

export default App;
