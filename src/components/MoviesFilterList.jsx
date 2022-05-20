import MovieCard from "./MovieCardItem";

const MoviesList = ({moviesArr}) => {
    return (
        <>
            <h1 style={{ textAlign:'center', marginTop: 30 }}>Pick a Movie</h1>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', padding: 20 }}>
                { moviesArr.map((movie, index) => <MovieCard movie={movie} key={ index } />) }
            </div>
        </>
    )
}

export default MoviesList;