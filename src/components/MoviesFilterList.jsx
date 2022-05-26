import MovieCardItem from "./MovieCardItem";

const MoviesList = ({moviesArr}) => {
    return (
        <>
            <h1 style={{ textAlign:'center', color:'#F7EC40', backgroundColor:'#2E3696', margin:'50px 30px 30px 30px', padding:10}}>Pick a Movie</h1>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', padding: 20 }}>
                { moviesArr.map((movie, index) => <MovieCardItem movie={movie} key={ index } />) }
            </div>
        </>
    )
}

export default MoviesList;