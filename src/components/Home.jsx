import { useEffect } from "react";
import { Carousel, Card } from 'antd';

import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";
import logo from "../../assets/flixbuster_logo.png"
import text from "../../assets/flixbuster_text.png"
import MovieCardItem from "./MovieCardItem";
import SelectInputSearch from "./SelectInputSearch";

const Home = () => {
    const { 
        _trendMovies:[trendMovies, setTrendMovies],
    } = getContextType('MoviesContext');

    const getTrendMovies = async () =>{
        try{
            let response;
            if (trendMovies.length!=0) response = trendMovies;
            else{
                response = await getAPIdata({
                    type: ACTIONS_LIST.SEARCH_TRENDS
                })
                //console.log('API',response);
                if (!(response && response.success!==false)) {
                    throw new Error('Server Error');
                }
                setTrendMovies(response.results);
            }
            //console.log(response)
        }catch(error){
            message.error(error.message);
        }
    }

    useEffect(()=>{
        getTrendMovies()
    },[])

    return (
        <>  
            <div style={{ display: 'flex', justifyContent:'center', width:'100%', padding:30 }}>
                <Card cover={
                    <Carousel autoplay>
                        <div><img src={ logo } style={{ maxWidth:829, width:'100%' }} /></div>
                        <div><img src={ text } style={{ maxWidth:829, width:'100%' }} /></div>
                    </Carousel>
                } 
                style={{ maxWidth:829, width:'100%', backgroundColor:'#2E3696' }} 
                bordered={false}>
                    <SelectInputSearch isJumbotronItem={true}/>
                </Card>
            </div>
            { trendMovies.length>0 && 
                <Card
                    title={
                      <h2 style={{ color:'#F7EC40' }}>Trending Movies</h2>
                    }
                    headStyle={{
                      backgroundColor:'#2E3696',
                      color:'#F7EC40'
                    }}
                    style={{ margin:30, borderColor:'#2E3696', textAlign:'center' }}
                >
                    <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', padding: 30 }}>
                        { trendMovies.map((movie, index) => <MovieCardItem movie={movie} key={ index } />) }
                    </div>
                </Card>
            }
        </>
    )
}

export default Home;