import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, message } from 'antd';
import { LikeFilled } from '@ant-design/icons';

import { ACTIONS_LIST, getAPIdata, getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";

const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}

const ArtistCard = ({className}) => {
    //const [artistInfo, setArtistInfo] = useState({})
    const routeParams = useParams();
    const { 
        _pickedArtist:[pickedArtist, setPickedArtist],
    } = getContextType('MoviesContext');
    const getArtistInfo = async () =>{
        let response;
        try{
            response = await getAPIdata({
                type: ACTIONS_LIST.GET_ARTIST_DATA,
                personId: routeParams.artist_id
            })
            console.log(response);
            if (response && response.success!==false) setPickedArtist(response);
            else throw new Error('Error del servidor');
        }catch(error){
            message.error(error.message);
            //navigate("/home", { replace: true })
        }
    }
    useEffect(()=>{
        getArtistInfo()
    },[])
    const artistInfo = pickedArtist;
    return (
        <div className={`artist-card${ className?' '+ className: '' }`}>
            <h1>{artistInfo.name}</h1>
                { artistInfo.profile_path && 
                    <Image src={ artistInfo.profile_path && getImgEndpoint(artistInfo.profile_path) } style={{ maxHeight: 400, padding:10 }} />
                }
            <h3>
                {artistInfo.birthday? artistInfo.birthday: undefined} <br />
                {!artistInfo.deathday? (artistInfo.birthday? getAge(artistInfo.birthday) + ' años':'') : 'Fallecido'}
            </h3>
            <h3>
                { artistInfo.gender==1? 'Mujer': (artistInfo.gender==2? 'Hombre': 'Genero Indefinido')}
            </h3>
            <h3>
                { artistInfo.known_for_department? 'Conocid'+String.fromCharCode(64)+ ' por:': undefined } <br />
                { artistInfo.known_for_department=='Acting'? 'Actuar': (artistInfo.known_for_department=='Directing'? 'Dirigir': artistInfo.known_for_department)}
            </h3>
            <h3>
                Popularidad: <br />
                {Math.floor(artistInfo.popularity)} <LikeFilled style={{ color:'blue' }}/>
            </h3>
        </div>
    )
}

export default ArtistCard;