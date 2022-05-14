import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import { Input, message } from 'antd';

import Navbar from "./Navbar";
import MoviesFilterList from "./MoviesFilterList";
import MovieCardFull from "./MovieCardFull";
import SignForm from "./SignForm";
import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";

const App =  () => {
    const { 
        _movieSearchResults:[movieSearchResults, setMovieSearchResults] 
    } = getContextType('MoviesContext');
    const [inputValue, setInputValue] = useState();
    const [selectedPath, setSelectedPath] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();
    const handleChange = (e) => setInputValue(e.target.value)
    
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
                //console.log(response);
            }catch(error){
                message.error(error.message);
            }
        }
    }

    const inputSearchProps = {
        placeholder:"Busca tu película...",
        allowClear: true,
        enterButton:"Buscar",
        size:"large",
        onSearch: handleMovieSearch,
        onChange:handleChange,
        value: inputValue
    }

    useEffect(()=>{
        let locationSplit = location.pathname.split('/')[1];
        //console.log('location', location, locationSplit);
        if (locationSplit == 'signup' || locationSplit == 'signin') locationSplit = 'sign'
        if (locationSplit != selectedPath) setSelectedPath(locationSplit)
    }, [location])

    return (
        <>
            <Navbar selectedPath={selectedPath} handleMovieSearch={handleMovieSearch}/>
            <h1>FlixBuster</h1>
            <Routes>
                <Route path="home" element={ <Input.Search {...inputSearchProps}/> }/>
                <Route path="filter" element={ 
                    movieSearchResults ? 
                    <MoviesFilterList moviesArr={movieSearchResults} />:
                    <Navigate to='home'/>
                }/>
                <Route path="movie/:movie_id" element={ <MovieCardFull /> }/>
                <Route path="signup" element={ <SignForm /> }/>
                <Route path="signin" element={ <SignForm /> }/>
                <Route path="*" element={<Navigate to='home'/>} />
            </Routes>
        </>
    );
}

export default App;
