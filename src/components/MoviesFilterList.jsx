import { Card } from "antd";
import MovieCardItem from "./MovieCardItem";

const MoviesList = ({moviesArr}) => {
    return (
        <Card
            title={
              <h2 style={{ color:'#F7EC40' }}>Pick a Movie</h2>
            }
            headStyle={{
              backgroundColor:'#2E3696',
              color:'#F7EC40',
              textAlign:'center'
            }}
            style={{ margin:30, borderColor:'#2E3696' }}
        >
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', padding: 20 }}>
                { moviesArr.map((movie, index) => <MovieCardItem movie={movie} key={ index } />) }
            </div>
        </Card>
    )
}

export default MoviesList;