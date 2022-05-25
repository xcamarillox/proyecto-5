import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, message, Collapse } from 'antd';
import { LikeFilled } from '@ant-design/icons';

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

const ArtistCard = ({className}) => {
    const routeParams = useParams();
    const [artistInfo, setArtistInfo] = useState({})
    const { 
        _searchResults:[searchResults],
        _pickedArtist:[pickedArtist, setPickedArtist],
    } = getContextType('MoviesContext');
    const getIndexOfArtist = () =>{
        let artistIndex = -1;
        if (!(searchResults && searchResults.results && searchResults.type=='artist')) return artistIndex;
        searchResults.results.forEach((artist, index) => {
            if (artist.id == routeParams.artist_id){
                artistIndex = index;
                return;
            }
        })
        return artistIndex;
    }
    const getArtistInfo = async () =>{
        try{
            let response;
            let indexCache = getIndexOfArtist();
            if (indexCache!=-1) response = searchResults.results[indexCache];
            else{
                response = await getAPIdata({
                    type: ACTIONS_LIST.GET_ARTIST_DATA,
                    artistId: routeParams.artist_id
                })
                if (!(response && response.success!==false)){
                    throw new Error('Error del servidor');
                }
            }
            //console.log(response);
            setPickedArtist(response);
            setArtistInfo(response);
        }catch(error){
            message.error(error.message);
            navigate("/home", { replace: true })
        }
    }
    useEffect(()=>{
        getArtistInfo()
    },[])
    return (
        <div className={`artist-card`}>
            <h1 style={{ color:'#2E3696' }}>{artistInfo.name}</h1>
            <Image
                preview = {artistInfo.profile_path ? true: false} 
                src={ artistInfo.profile_path? getImgEndpoint(artistInfo.profile_path): question } 
                style={{ maxHeight: 400, padding:10 }} 
            />
            <h3 style={{ color:'#2E3696' }}>
                {artistInfo.birthday? artistInfo.birthday: undefined} {!artistInfo.deathday? (artistInfo.birthday? '(' + getAge(artistInfo.birthday) + ' years old)':'') : 'Deseaded'} <br />
                {artistInfo.place_of_birth}
            </h3>
            <h3 style={{ color:'#2E3696' }}>
                { artistInfo.gender==1? 'Female': (artistInfo.gender==2? 'Male': 'Undefined')}
            </h3>
            <h3 style={{ color:'#2E3696' }}>
                { artistInfo.known_for_department && 'Known for:'} <br />
                { artistInfo.known_for_department && artistInfo.known_for_department}
            </h3>
            <h3 style={{ color:'#2E3696' }}>
                Popularity: <br />
                {Math.floor(artistInfo.popularity)} <LikeFilled style={{ color:'blue' }}/>
            </h3>
            {
                artistInfo.biography &&
                <Collapse>
                    <Collapse.Panel header="Biography" key="1" style={{ color:'#2E3696' }}>
                        <p style={{ color:'#2E3696' }}>
                            { artistInfo.biography }
                        </p>
                    </Collapse.Panel>
                </Collapse>
            }
        </div>
    )
}

export default ArtistCard;