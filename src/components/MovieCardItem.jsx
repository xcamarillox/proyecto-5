import { Card, Button, Image } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { getImgEndpoint } from '../scripts/api-helpers';

const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}

export default ({movie}) => {
    return (
        <Card
            hoverable
            style={{ maxWidth: 240, textAlign:'center' }}
            cover={<img src={ movie.poster_path && getImgEndpoint(movie.poster_path) } />}
        >
                {/* <Card.Meta title={ movie.title } style={{ overflow:'auto' }} description="www.instagram.com" /> */}
                <h3>{ movie.title } <br/> {new Date(movie.release_date).getFullYear()} </h3>
                <h3>${ Math.floor(((movie.popularity) * 0.05) + 5) }</h3>
                <Button type="primary" value="large"> Agregar al Carrito <ShoppingCartOutlined /></Button>
        </Card>
    )
}