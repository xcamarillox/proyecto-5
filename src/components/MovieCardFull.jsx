import { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import { Card, Image, Row, Col, message } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { ACTIONS_LIST, getAPIdata, getImgEndpoint } from '../scripts/api-helpers';

const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}

export default () => {
    const [movie, setMovie] = useState({})
    const [cast, setCast] = useState([])
    const routeParams = useParams();
    
    const getMovies = async () =>{
        try{
            let response = await getAPIdata({
                type: ACTIONS_LIST.SEARCH_FOR_MOVIE_DETAILS,
                movieId:routeParams.movie_id
            })
            //if (!(response && response.success!==false)) throw new Error('Error del servidor');
            //if (response.results.length == 0) {
            //    message.error(`No se tuvieron resultados con ${searchedMovie.trim()}`);
            //    return;
            //}
            //console.log(response);
            setMovie(response);
            response = await getAPIdata({
                type: ACTIONS_LIST.SEARCH_FOR_MOVIE_CREDITS,
                movieId:routeParams.movie_id
            })
            //console.log(response);
            setCast(response.cast)
        }catch(error){
            message.error(error.message);
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
            backgroundColor:'rgb(33, 37, 41)',
            color:'white'
        }}
        extra={
            <div style={{ color:'white' }}>
                { movie.vote_average? 
                    <>
                        {movie.vote_average} / 10 <StarFilled style={{ color:'yellow' }}/>
                    </>: 'No votada'
                }
            </div>
        }
        style={{ margin:15 }}>
            <Card type='inner' bordered={false}>
                <Row justify="space-evenly" align='middle'>
                    <Col lg={4}>
                        { movie.poster_path && <Image src={ movie.poster_path && getImgEndpoint(movie.poster_path) } style={{ maxHeight: 300 }} /> }
                    </Col>
                    <Col xs={24} sm={24} md={16} style={{margin:10}}>
                        <p>{movie.overview}</p>
                    </Col>
                </Row>
            </Card>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', marginTop:'50px' }}>
                { cast && cast.map((performer, index) => 
                    <Card 
                        type='inner' 
                        key={index}
                        cover={ <Image src={ performer.profile_path && getImgEndpoint(performer.profile_path) }/> }
                        style={{ maxWidth: 100, textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'space-between' }}
                    > 
                      <h3>{ performer.name } </h3>
                    </Card>
                )}
            </div>
        </Card>
    )
}