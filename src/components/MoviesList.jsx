import { Card } from 'antd';

import { getImgEndpoint } from '../scripts/api-helpers';

import MovieCard from "./MovieCardItem";

const MoviesList = ({moviesArr}) => {
    return (
        <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px' }}>
            <h2>Películas</h2>
            { moviesArr.map((movie, index) => <MovieCard movie={movie} key={ index } />) }
        </div>
    )
}

export default MoviesList;