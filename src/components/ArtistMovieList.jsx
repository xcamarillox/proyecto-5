import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";
import ArtistMovieCard from "./ArtistMovieCard.jsx";

const ArtistMovieList = () => {
    const routeParams = useParams();
    const { 
        _pickedArtistMovies:[pickedArtistMovies, setPickedArtistMovies],
    } = getContextType('MoviesContext');
    const getArtistMovies = async () =>{
        let response;
        try{
            if (pickedArtistMovies.length === 0){
                response = await getAPIdata({
                    type: ACTIONS_LIST.GET_FEATURING_MOVIES,
                    artistId: routeParams.artist_id
                })
                //console.log('ArtistMovieList', response);
                if (response && response.success!==false) setPickedArtistMovies(response.cast);
                else throw new Error('Error del servidor');
            }
        }catch(error){
            message.error(error.message);
        }
    }

    useEffect(()=>{
        getArtistMovies()
    },[])

    const moviesArr = pickedArtistMovies;
    return (
        <div className='movies-list'>
            { moviesArr.map((movie, index) => <ArtistMovieCard movie={movie} key={ index } />) }
        </div>
    )
}


export default ArtistMovieList;