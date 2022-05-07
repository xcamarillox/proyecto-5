import MovieCard from "./MovieCard";

const MoviesList = ({moviesArr}) => {
    return (
        <div>
            <h2>Películas</h2>
            { moviesArr.map((movie, index) => <MovieCard movie={movie} key={ index } />) }
        </div>
    )
}

export default MoviesList;