import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';
import MovieCardArtist from "./MovieCardArtist.jsx";

const MoviesList = () => {
    const [moviesArr, setMoviesArr] = useState([])
    const routeParams = useParams();
    const getArtistMovies = async () =>{
        let response;
        try{
            response = await getAPIdata({
                type: ACTIONS_LIST.GET_FEATURING_MOVIES,
                personId: routeParams.artist_id
            })
            console.log('MoviesList', response);
            if (response && response.success!==false) setMoviesArr(response.cast);
            else throw new Error('Error del servidor');
        }catch(error){
            message.error(error.message);
        }
    }

    useEffect(()=>{
        getArtistMovies()
    },[])

    return (
        <div className='movies-list'>
            { moviesArr.map((movie, index) => <MovieCardArtist movie={movie} key={ index } />) }
        </div>
    )
}


export default MoviesList;