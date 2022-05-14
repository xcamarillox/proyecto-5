import { useNavigate  } from 'react-router-dom';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";

export default ({movie}) => {
    const navigate = useNavigate();
    const { _cart:[cart, setCart] } = getContextType('MoviesContext');
    const { _pickedMovie:[pickedMovie, setPickedMovie] } = getContextType('MoviesContext');

    const handleClickOnButton = (params) => {
        console.log('cart', cart)
        params.e.stopPropagation();
        let cartCache = cart.map(item => item);
        let areItemsRepeated = false
        cart.forEach((cartItem, index) => {
            if (cartItem.movie.id === params.movie.id){
                areItemsRepeated = true;
                cartCache[index].quantity++;
                setCart(cartCache)
                return;
            }
        })
        if (!areItemsRepeated){
            cartItem = { quantity: 1, movie: params.movie }
            setCart([...cart, cartItem])
        }
    }

    const handleClickOnCard = (params) => {
        console.log('card', params)
        params.e.stopPropagation();
        setPickedMovie(params.movie);
        console.log('card', params, "/movie/" + params.movie.id);
        navigate("/movie/" + params.movie.id, { replace: true })
    }
    return (
        <Card
            hoverable
            onClick={ (event) => handleClickOnCard({ e:event, movie }) }
            style={{ maxWidth: 240, textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'space-between' }}
            cover={<img src={ movie.poster_path && getImgEndpoint(movie.poster_path) } />}
        >
                <h3>{ movie.title } <br/> {new Date(movie.release_date).getFullYear()} </h3>
                <h3>${ Math.floor(((movie.popularity) * 0.05) + 5) }</h3>
                <Button type="primary" value="large" onClick={ (event) => handleClickOnButton({ e:event, movie }) }> Agregar al Carrito <ShoppingCartOutlined /></Button>
        </Card>
    )
}