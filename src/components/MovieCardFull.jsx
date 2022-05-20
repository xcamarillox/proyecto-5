import { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Card, Image, Row, Col, message } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { ACTIONS_LIST, getAPIdata, getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";

import question from "../../assets/question.png"

const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}

export default () => {
    const { 
        _movieSearchResults:[movieSearchResults, setMovieSearchResults] 
    } = getContextType('MoviesContext');
    const [movie, setMovie] = useState({})
    const [cast, setCast] = useState([])
    const routeParams = useParams();
    const navigate = useNavigate();
    const getIndexOfMovie = () =>{
        let movieIndex = -1;
        if (!movieSearchResults) return movieIndex;
        movieSearchResults.forEach((movie, index) => {
            if (movie.id == routeParams.movie_id){
                movieIndex = index;
                return;
            }
        })
        return movieIndex;
    }
    const getMovies = async () =>{
        try{
            let response;
            let indexCache = getIndexOfMovie();
            if (indexCache!=-1) response = movieSearchResults[indexCache];
            else{
                response = await getAPIdata({
                    type: ACTIONS_LIST.SEARCH_FOR_MOVIE_DETAILS,
                    movieId:routeParams.movie_id
                })
                if (!(response && response.success!==false)) {
                    throw new Error('Error del servidor');
                }
            }
            //console.log(response, indexCache);
            setMovie(response);
            response = await getAPIdata({
                type: ACTIONS_LIST.SEARCH_FOR_MOVIE_CREDITS,
                movieId:routeParams.movie_id
            })
            //console.log(response);
            if (response && response.success!==false) setCast(response.cast)
        }catch(error){
            message.error(error.message);
            navigate("/home", { replace: true })
        }
    }

    useEffect(()=>{
        getMovies()
    },[])

    return (
        <Card 
            title={
                <>
                    <div>{movie.title}</div>
                    { movie.release_date && 
                        <div>
                            {movie.release_date + ' '} 
                            { getAge(movie.release_date)>1 && 
                                <>
                                    / {getAge(movie.release_date)} años
                                </>
                            }
                        </div> 
                    }
                </>
            }
            headStyle={{
                backgroundColor:'#2E3696',
                color:'#F7EC40'
            }}
            extra={
                <div style={{ color:'#F7EC40' }}>
                    { movie.vote_average? 
                        <>
                            {movie.vote_average} / 10 <StarFilled style={{ color:'#F7EC40' }}/>
                        </>: 'No votada'
                    }
                </div>
            }
            style={{ margin:30, borderColor:'#2E3696' }}
        >
            <Card type='inner' bordered={false}>
                <Row justify="space-evenly" align='middle'>
                    <Col lg={4}>
                        { movie.poster_path && <Image src={ movie.poster_path? getImgEndpoint(movie.poster_path): question } style={{ maxHeight: 300 }} /> }
                    </Col>
                    <Col xs={24} sm={24} md={16} style={{margin:10}}>
                        <p>{movie.overview}</p>
                    </Col>
                </Row>
            </Card>
            <h1 style={{ textAlign:'center', marginTop: 50, color:'#2E3696' }}>Cast</h1>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', marginTop:10 }}>
                { cast && cast.map((performer, index) => 
                    <Card 
                        type='inner' 
                        key={index}
                        cover={ <Image src={ performer.profile_path? getImgEndpoint(performer.profile_path): question }/> }
                        style={{ maxWidth: 100, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', color:'#2E3696', borderColor:'#2E3696' }}
                    > 
                      <h3 style={{ color:'#2E3696' }}>{ performer.name } </h3>
                    </Card>
                )}
            </div>
        </Card>
    )
}