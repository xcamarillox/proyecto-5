import { useNavigate  } from 'react-router-dom';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { getImgEndpoint } from '../scripts/api-helpers';

export default ({movie}) => {
    const navigate = useNavigate();
    const handleClickOnButton = (params) => {
        console.log('button',params);
        params.e.stopPropagation();
    }
    const handleClickOnCard = (params) => {
        console.log('card', params)
        params.e.stopPropagation();
        console.log('card', params, "/movie/" + params.movie_id);
        navigate("/movie/" + params.movie_id, { replace: true })
    }

    return (
        <Card
            hoverable
            onClick={ (event) => handleClickOnCard({ e:event, movie_id:movie.id }) }
            style={{ maxWidth: 240, textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'space-between' }}
            cover={<img src={ movie.poster_path && getImgEndpoint(movie.poster_path) } />}
        >
                {/* <Card.Meta title={ movie.title } style={{ overflow:'auto' }} description="www.instagram.com" /> */}
                <h3>{ movie.title } <br/> {new Date(movie.release_date).getFullYear()} </h3>
                <h3>${ Math.floor(((movie.popularity) * 0.05) + 5) }</h3>
                <Button type="primary" value="large" onClick={ (event) => handleClickOnButton({ e:event, movie_id:movie.id }) }> Agregar al Carrito <ShoppingCartOutlined /></Button>
        </Card>
    )
}