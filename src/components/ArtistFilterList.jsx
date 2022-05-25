import { useNavigate } from 'react-router-dom';
import { Card } from "antd";

import { getImgEndpoint } from '../scripts/api-helpers';

import question from "../../assets/question.png"

const ArtistFilterList = ({artistArr}) => {
    const navigate = useNavigate();
    const handleClickOnCard = (params) => {
      navigate("/artist/" + params.artistId, { replace: true });
    }
    return (
      <>
        <h1 style={{ textAlign:'center', marginTop: 30, color:'#2E3696' }}>Pick an Artist</h1>
        <div style={{
          justifyContent: 'center',
          position: 'relative',
          display: 'flex',
          flexWrap: 'wrap',
          padding: 20,
          gap: 15
        }}>
            { artistArr.map((artist, index) => 
                <Card
                  onClick={ (event) => handleClickOnCard({e:event, artistId:artist.id}) }
                  key={ index }
                  hoverable
                  style={{ width: 200, borderColor:'#2E3696', textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'flex-start' }}
                  cover={<img src={ artist.profile_path? getImgEndpoint(artist.profile_path): question } />} 
                >
                  <h3 style={{ color:'#2E3696' }}>{artist.name}</h3>  
                  <p style={{ color:'#2E3696' }}>Conocido por:</p>
                  {artist.known_for.map((movie) => <p key={ movie.id } style={{ color:'#2E3696' }}>{movie.title}</p>)}
                </Card>
            )}
        </div>
      </>
    )
};

export default ArtistFilterList;