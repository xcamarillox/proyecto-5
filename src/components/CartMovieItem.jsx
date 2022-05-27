
import { useNavigate } from 'react-router-dom';
import { Image, Row, Col, Button, Input, message } from 'antd';
import { StarFilled, DeleteOutlined } from '@ant-design/icons';

import { getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";

import question from "../../assets/question.png"

export default ({cartItem, itemIndex, isCheckOutMode}) => {
    const navigate = useNavigate();
    const { 
        _cart:[cart, setCart],
        _pickedMovie:[pickedMovie, setPickedMovie], 
    } = getContextType('MoviesContext');
    const movie = cartItem.movie;
    const handleInputChange = (e) => {
        let targetValue = parseInt(e.target.value); 
        if (targetValue === 0 || isNaN(targetValue)) targetValue = 1;
        let cartCache = [...cart];
        cartCache[itemIndex].quantity = targetValue;
        //console.log(targetValue, itemIndex, cartCache)
        setCart(cartCache);
    }
    const handleButtonClick = () => {
        let cartCache = [...cart];
        cartCache.splice(itemIndex, 1);
        //console.log(targetValue, itemIndex, cartCache)
        message.success(<p><strong>{movie.title}</strong> removed from your cart</p>);
        setCart(cartCache);
    }
    const handleLinkToMovie = () => {
        setPickedMovie(cart[itemIndex].movie);
        navigate("/movie/" + cart[itemIndex].movie.id, { replace: true })
    }
    return (
        <div style={{ width:'100%', marginTop:10, marginBottom:10 }}>
            <Row justify="space-evenly" align='middle'>
                <Col lg={isCheckOutMode ? 2 :4}>
                    <Image 
                        preview = {movie.poster_path ? true: false}
                        src={ movie.poster_path? getImgEndpoint(movie.poster_path): question } 
                        style={{ minHeight:100, maxHeight: isCheckOutMode?150:250 }} 
                    /> 
                </Col>
                <Col xs={24} sm={24} md={isCheckOutMode ? 18 :16} style={{margin: '10px 10px 20px 10px'}}>
                    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
                        <div 
                            onClick={handleLinkToMovie} 
                            style={{ 
                                display:'flex', 
                                textAlign:'center', 
                                justifyContent:'space-between', 
                                flexWrap:'wrap', backgroundColor:'#2E3696', 
                                marginBottom:10, 
                                padding:10, 
                                cursor:'pointer' 
                            }}
                        >
                            <h3 style={{ color:'#F7EC40' }}>{movie.title}</h3>
                            <h3 style={{ color:'#F7EC40', textAlign:'center' }}>
                                ${ cartItem.price*cartItem.quantity }
                            </h3>
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between', width:'100%' }}>
                                <Button 
                                    type='primary' 
                                    danger 
                                    onClick={handleButtonClick} 
                                    disabled={isCheckOutMode}
                                >
                                    <DeleteOutlined />
                                </Button>
                                <Input 
                                    addonBefore='Quantity:'
                                    addonAfter={`$${ cartItem.price } / each`}
                                    type='number' 
                                    size='middle' 
                                    style={{ maxWidth:300, margin:'0px 5px'  }} 
                                    value={cartItem.quantity} 
                                    onChange={handleInputChange}
                                    disabled={isCheckOutMode}
                                />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}