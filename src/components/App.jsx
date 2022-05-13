import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Input, message } from 'antd';

import Navbar from "./Navbar";
import MoviesList from "./MoviesList";
import MovieCardFull from "./MovieCardFull";
import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';

const App =  () => {
    const [moviesArr, setMoviesArr] = useState();
    const [inputValue, setInputValue] = useState();
    const [selectedPath, setSelectedPath] = useState('home');
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
                    message.error(`No se tuvieron resultados con ${searchedMovie.trim()}`);
                    return;
                }
                setMoviesArr(response.results);
                console.log(response);
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
        if (location.pathname != selectedPath) setSelectedPath(location.pathname.slice(1))
    }, [location])

    return (
        <>
            <Navbar selectedPath={selectedPath} />
            <h1>FlixBuster</h1>
            <Routes>
                <Route path="home" element={
                    <>
                        <Input.Search {...inputSearchProps}/>
                        { moviesArr && <MoviesList moviesArr={moviesArr} /> }
                    </>
                }/>
                <Route path="movie/:movie_id" element={ <MovieCardFull /> }/>
                <Route path="*" element={<Navigate to='home'/>} />
            </Routes>
        </>
    );
}

export default App;
