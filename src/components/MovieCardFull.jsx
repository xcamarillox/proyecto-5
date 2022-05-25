import { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Card, Image, Row, Col, message } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { ACTIONS_LIST, getAPIdata, getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";
import PriceAndAddToCart from "./PriceAndAddToCart";

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
        _pickedMovie:[pickedMovie, setPickedMovie],
        _pickedArtist:[pickedArtist, setPickedArtist],
        _pickedArtistMovies: [pickedArtistMovies, setPickedArtistMovies],
        _searchResults:[searchResults] 
    } = getContextType('MoviesContext');
    const [movie, setMovie] = useState({})
    const [cast, setCast] = useState([])
    const routeParams = useParams();
    const navigate = useNavigate();

    const handleClickOnCard = (params) => navigate("/artist/" + params.artist.id, { replace: true })

    const getIndexOfMovie = () =>{
        let movieIndex = -1;
        if (!(searchResults && searchResults.results && searchResults.type=='movie')) return movieIndex;
        searchResults.results.forEach((movie, index) => {
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
            if (indexCache!=-1) response = searchResults.results[indexCache];
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
            setPickedMovie(response);
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
                movie.vote_average? 
                    <div style={{ color:'#F7EC40' }}>
                        {movie.vote_average} / 10 <StarFilled/>
                    </div>
                    :<h3 style={{ color:'#F7EC40' }}>No votada</h3>
            }
            style={{ margin:30, borderColor:'#2E3696' }}
        >
            <Card type='inner' bordered={false}>
                <Row justify="space-evenly" align='middle'>
                    <Col lg={4}>
                        <Image
                            preview = {movie.poster_path ? true: false} 
                            src={ movie.poster_path? getImgEndpoint(movie.poster_path): question } 
                            style={{ maxHeight: 300 }} 
                        /> 
                    </Col>
                    <Col xs={24} sm={24} md={16} style={{margin:10}}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <p>{movie.overview}</p>
                            <PriceAndAddToCart movie={movie} />
                        </div>
                    </Col>
                </Row>
            </Card>
            {cast.length>0 && <h1 style={{ textAlign:'center', marginTop: 50, color:'#2E3696' }}>Cast</h1>}
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', marginTop:10 }}>
                { cast && cast.map((artist, index) => 
                    <Card 
                        hoverable
                        type='inner' 
                        onClick={ (event) => handleClickOnCard({ e:event, artist }) }
                        key={index}
                        cover={ <Image preview={false} src={ artist.profile_path? getImgEndpoint(artist.profile_path): question }/> }
                        style={{ maxWidth: 100, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', color:'#2E3696', borderColor:'#2E3696' }}
                    > 
                      <h3 style={{ color:'#2E3696' }}>{ artist.name } </h3>
                    </Card>
                )}
            </div>
        </Card>
    )
}