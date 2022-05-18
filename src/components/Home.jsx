import { useState, useEffect } from "react";
import { Input } from 'antd';

import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';
import MovieCard from "./MovieCardItem";

const Home = ({handleMovieSearch}) => {
    const [inputValue, setInputValue] = useState();
    const [moviesArr, setMoviesArr] = useState([])
    const handleChange = (e) => setInputValue(e.target.value)
    const getMovies = async () =>{
        try{
            let response = await getAPIdata({
                type: ACTIONS_LIST.SEARCH_TRENDS
            })
            //console.log(response);
            if (!(response && response.success!==false)) {
                throw new Error('Error del servidor');
            }
            setMoviesArr(response.results);
            //console.log(response.results)
        }catch(error){
            message.error(error.message);
        }
    }

    useEffect(()=>{
        getMovies()
    },[])

    const inputSearchProps = {
        placeholder:"Busca tu película...",
        allowClear: true,
        enterButton:"Buscar",
        size:"large",
        onSearch: handleMovieSearch,
        onChange:handleChange,
        value: inputValue
    }

    return (
        <>
            <Input.Search {...inputSearchProps}/>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', padding: 20 }}>
                { moviesArr.map((movie, index) => <MovieCard movie={movie} key={ index } />) }
            </div>
        </>
    )
}

export default Home;