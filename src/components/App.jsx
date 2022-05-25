import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import { message, ConfigProvider } from 'antd';

import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";
import Home from "./Home";
import Navbar from "./Navbar";
import SignForm from "./SignForm";
import CartList from "./CartList";
import MoviesFilterList from "./MoviesFilterList";
import ArtistFilterList from "./ArtistFilterList";
import MovieCardFull from "./MovieCardFull";
import ArtistCard from "./ArtistCard.jsx";
import ArtistMovieList from "./ArtistMovieList.jsx";

const App =  () => {
    const { 
        _searchSetup:[searchSetup],
        _searchResults:[searchResults, setSearchResults],
        _cart:[cart]
    } = getContextType('MoviesContext');
    const [selectedPath, setSelectedPath] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = async (searchedText) => {
        if (searchedText.trim().length != 0){
            try{
                let response;
                //console.log(searchSetup);
                if (searchSetup.type == 'movie'){
                    response = await getAPIdata({
                        type: ACTIONS_LIST.SEARCH_FOR_MOVIES,
                        searchedMovie: searchedText.trim()
                    })
                }else{
                    response = await getAPIdata({
                        type: ACTIONS_LIST.SEARCH_FOR_ARTIST,
                        searchedArtist: searchedText.trim()
                    })
                    //console.log('App',response.results)
                }
                if (!(response && response.success!==false)) throw new Error('Error del servidor');
                if (response.results.length == 0) {
                    setSearchResults()
                    message.error(`No se tuvieron resultados con ${searchedText.trim()}`);
                    return;
                }
                setSearchResults({type:searchSetup.type, results:response.results});
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
            <Navbar selectedPath={selectedPath} handleSearch={handleSearch}/>
            <Routes>
                <Route path="home" element={ <Home handleSearch={handleSearch} /> }/>
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
                <Route path="artist/:artist_id" element= {
                    <>
                        <ArtistCard  />
                        <ArtistMovieList />
                    </>
                }/>
                <Route path="*" element={<Navigate to='home'/>} />
            </Routes>
        </ConfigProvider>
    );
}

export default App;
