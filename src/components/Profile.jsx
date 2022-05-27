import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { LikeFilled } from '@ant-design/icons';

import { getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";

export default () => {
    const navigate = useNavigate();
    const [artistInfo, setArtistInfo] = useState({})
    const { 
        _pickedMovie:[pickedMovie, setPickedMovie], 
    } = getContextType('MoviesContext');
    return (
        <Card
            title={ 
                <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center' }}>
                    <h2 style={{ color:'#F7EC40' }}> { artistInfo.name }</h2>
                        <h4 style={{ color:'#F7EC40' }}>
                            {artistInfo.birthday? artistInfo.birthday: undefined} 
                            {!artistInfo.deathday? (artistInfo.birthday? ' (' + getAge(artistInfo.birthday) + ' years old)':'') : ' Deceased'} <br/>
                            {artistInfo.place_of_birth}
                        </h4>
                </div>
            }
            headStyle={{ backgroundColor:'#2E3696' }}
            style={{ margin:30, borderColor:'#2E3696', textAlign:'center' }}
        >
            <div style={{ width: '100%', marginTop: 10, textAlign: 'center' }}>
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
        </Card>
    )
}