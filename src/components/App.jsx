import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import { message, ConfigProvider, Layout } from 'antd';

import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";
import Navbar from "./Navbar";
import MoviesFilterList from "./MoviesFilterList";
import MovieCardFull from "./MovieCardFull";
import ArtistCard from "./ArtistCard.jsx";
import MovieArtistList from "./MovieArtistList.jsx";
import CartList from "./CartList";
import Home from "./Home";
import SignForm from "./SignForm";

const App =  () => {
    const { 
        _movieSearchResults:[movieSearchResults, setMovieSearchResults],
        _cart:[cart]
    } = getContextType('MoviesContext');
    const [selectedPath, setSelectedPath] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    const handleMovieSearch = async (searchedMovie) => {
        if (searchedMovie.trim().length != 0){
            try{
                const response = await getAPIdata({
                    type: ACTIONS_LIST.SEARCH_FOR_MOVIES,
                    searchedMovie
                })
                if (!(response && response.success!==false)) throw new Error('Error del servidor');
                if (response.results.length == 0) {
                    setMovieSearchResults()
                    message.error(`No se tuvieron resultados con ${searchedMovie.trim()}`);
                    return;
                }
                setMovieSearchResults(response.results);
                navigate("/filter", { replace: true });
                //console.log(response.results);
            }catch(error){
                message.error(error.message);
            }
        }
    }
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
            <Navbar selectedPath={selectedPath} handleMovieSearch={handleMovieSearch}/>
            <Routes>
                <Route path="home" element={ <Home handleMovieSearch={handleMovieSearch} /> }/>
                <Route path="filter" element={ 
                    movieSearchResults ? 
                    <MoviesFilterList moviesArr={movieSearchResults} />:
                    <Navigate to='home'/>
                }/>
                <Route path="movie/:movie_id" element={ <MovieCardFull /> }/>
                <Route path="signup" element={ <SignForm /> }/>
                <Route path="signin" element={ <SignForm /> }/>
                <Route path="cart" element={ 
                    cart.length > 0 ?
                    <CartList /> :
                    <Navigate to='home'/>
                }/>
                <Route path="artist/:artist_id" element= {
                    <>
                        <ArtistCard  />
                        <MovieArtistList />
                    </>
                }/>
                <Route path="*" element={<Navigate to='home'/>} />
            </Routes>
        </ConfigProvider>
    );
}

export default App;
