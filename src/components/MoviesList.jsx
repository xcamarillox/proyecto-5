import MovieCard from "./MovieCardItem";

const MoviesList = ({moviesArr}) => {
    return (
        <>
            <h2>Películas</h2>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px' }}>
                { moviesArr.map((movie, index) => <MovieCard movie={movie} key={ index } />) }
            </div>
        </>
    )
}

export default MoviesList;