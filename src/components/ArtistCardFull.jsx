import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, message, Collapse, Card } from 'antd';
import { LikeFilled } from '@ant-design/icons';

import { ACTIONS_LIST, getAPIdata, getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";
import ArtistMovieCard from "./ArtistMovieCard.jsx";

import question from "../../assets/question.png"

const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}

const ArtistCardFull = () => {
    const routeParams = useParams();
    const [artistInfo, setArtistInfo] = useState({})
    const [moviesArr, setMoviesArr] = useState([])
    const { 
        _pickedArtist:[pickedArtist, setPickedArtist],
        _pickedArtistMovies:[pickedArtistMovies, setPickedArtistMovies],
    } = getContextType('MoviesContext');
    const getArtistInfo = async () =>{
        try{
            let response;
            if (pickedArtist && pickedArtist.id == routeParams.artist_id) {
                response = pickedArtist;
            }
            else{
                //console.log('ARTIST CARD API');
                response = await getAPIdata({
                    type: ACTIONS_LIST.GET_ARTIST_DATA,
                    artistId: routeParams.artist_id
                })
                if (!(response && response.success!==false)){
                    throw new Error('Server Error');
                }
            }
            //console.log(response);
            setPickedArtist(response);
            setArtistInfo(response);
            if (pickedArtistMovies && pickedArtistMovies.id == routeParams.artist_id) {
                response = pickedArtistMovies;
            }
            else{
                //console.log('ARTIST MOVIES CARD API');
                response = await getAPIdata({
                    type: ACTIONS_LIST.GET_FEATURING_MOVIES,
                    artistId: routeParams.artist_id
                })
                setPickedArtistMovies(response);
            }
            if (response && response.success!==false) setMoviesArr(response.cast)
        }catch(error){
            message.error(error.message);
            navigate("/home", { replace: true })
        }
    }
    useEffect(()=>{
        getArtistInfo()
    },[])

    return (
        <Card
            title={ <h3 style={{ color:'#F7EC40' }}> { artistInfo.name }</h3>}
            headStyle={{ backgroundColor:'#2E3696' }}
            extra={
                <h3 style={{ color:'#F7EC40' }}>
                    {artistInfo.birthday? artistInfo.birthday: undefined} {!artistInfo.deathday? (artistInfo.birthday? '(' + getAge(artistInfo.birthday) + ' years old)':'') : 'Deseaded'} <br />
                    {artistInfo.place_of_birth}
                </h3>
            }
            style={{ margin:30, borderColor:'#2E3696' }}
        >
            <div style={{ width: '100%', marginTop: 10, textAlign: 'center' }}>
                <Image
                    preview = {artistInfo.profile_path ? true: false} 
                    src={ artistInfo.profile_path? getImgEndpoint(artistInfo.profile_path): question } 
                    style={{ maxHeight: 400, padding:10, maxWidth:300 }} 
                />
                <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-around', backgroundColor:'#2E3696', width:'100%', padding:5 }}>
                    <h3 style={{ color:'#F7EC40' }}>
                        { artistInfo.gender==1? 'Female': (artistInfo.gender==2? 'Male': 'Undefined')}
                    </h3>
                    <h3 style={{ color:'#F7EC40' }}>
                        { artistInfo.known_for_department && 'Known for: '} 
                        { artistInfo.known_for_department && artistInfo.known_for_department}
                    </h3>
                    <h3 style={{ color:'#F7EC40' }}>
                        { artistInfo.popularity && 'Popularity: '} 
                        {Math.floor(artistInfo.popularity)} <LikeFilled style={{ color:'#F7EC40' }}/>
                    </h3>
                </div>
            </div>
            {
                artistInfo.biography &&
                <Collapse style={{ borderColor:'#2E3696', color:'#2E3696' }}>
                    <Collapse.Panel header="Biography" key="1" style={{ borderColor:'#2E3696' }}>
                        <p style={{ color:'#2E3696' }}>
                            { artistInfo.biography }
                        </p>
                    </Collapse.Panel>
                </Collapse>
            }
            <div style={{ marginTop:60 }}>
                { moviesArr.map((movie, index) => <ArtistMovieCard movie={movie} key={ index } />) }
            </div>
        </Card>
    )
}

export default ArtistCardFull;