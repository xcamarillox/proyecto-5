import { useNavigate } from 'react-router-dom';
import { Card, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";

import question from "../../assets/question.png"

export default ({movie}) => {
    const navigate = useNavigate();
    const { 
        _cart:[cart, setCart],
        _pickedMovie:[pickedMovie, setPickedMovie], 
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
    const handleClickOnCard = (params) => {
        setPickedMovie(params.movie);
        navigate("/movie/" + params.movie.id, { replace: true })
    }
    return (
        <Card
            hoverable
            onClick={ (event) => handleClickOnCard({ e:event, movie }) }
            style={{ maxWidth: 240, textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'space-between', borderColor:'#2E3696'}}
            cover={<img src={ movie.poster_path? getImgEndpoint(movie.poster_path): question } />}
        >
                <h3 style={{ color:'#2E3696' }}>{ movie.title } <br/> {new Date(movie.release_date).getFullYear()} </h3>
                <h3 style={{ color:'#2E3696', fontWeight:900 }}>${ Math.floor(((movie.popularity) * 0.05) + 5) }</h3>
                <Button style={{ color:'#F7EC40', fontWeight:500 }} type='primary' value="large" onClick={ (event) => handleClickOnButton({ e:event, movie }) }> 
                    Add to Cart <ShoppingCartOutlined />
                </Button>
        </Card>
    )
}