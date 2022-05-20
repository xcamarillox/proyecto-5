import { Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { getContextType } from "../context/AppContext";

const PriceAndAddToCart = ({movie}) => {
    const { 
        _cart:[cart, setCart],
    } = getContextType('MoviesContext');

    const handleClickOnButton = (params) => {
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
        message.success(`You added ${params.movie.title} to your cart`);
    }
    return (
        <>
            <h3 style={{ color:'#2E3696', fontWeight:900 }}>${ Math.floor(((movie.popularity) * 0.05) + 5) }</h3>
            <Button style={{ color:'#F7EC40', fontWeight:500 }} type='primary' value="large" onClick={ (event) => handleClickOnButton({ e:event, movie }) }> 
                Add to Cart <ShoppingCartOutlined />
            </Button>
        </>
    )
}

export default PriceAndAddToCart;