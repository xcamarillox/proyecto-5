
import { useNavigate } from 'react-router-dom';
import { Card, Image, Row, Col, Button, Input, message } from 'antd';
import { StarFilled, DeleteOutlined } from '@ant-design/icons';

import { getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";

import question from "../../assets/question.png"

export default ({cartItem, itemIndex}) => {
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
        <Card style={{ marginTop:5, borderColor:'#2E3696', width:'100%' }}>
            <Card type='inner' bordered={false}>
                <Row justify="space-evenly" align='middle'>
                    <Col lg={4}>
                        <Image 
                            preview = {movie.poster_path ? true: false}
                            src={ movie.poster_path? getImgEndpoint(movie.poster_path): question } 
                            style={{ minHeight:100 }} 
                        /> 
                    </Col>
                    <Col xs={24} sm={24} md={16} style={{margin:10}}>
                        <div style={{ display:'flex', flexDirection:'column' }}>
                            <div 
                                onClick={handleLinkToMovie} 
                                style={{ display:'flex', justifyContent:'space-between', backgroundColor:'#2E3696', marginBottom:10, padding:10, cursor:'pointer' }}
                            >
                                <h3 style={{ color:'#F7EC40' }}>{movie.title}</h3>
                                { movie.vote_average? 
                                    <h3 style={{ color:'#F7EC40' }}>
                                        {movie.vote_average} / 10 <StarFilled/>
                                    </h3>: 
                                    'No votada'
                                }
                            </div>
                            <div style={{ display:'flex', justifyContent:'space-between' }}>
                                <Button type='primary' danger onClick={handleButtonClick}><DeleteOutlined /></Button>
                                <Input addonBefore="Quantity:" type='number' size='middle' style={{ maxWidth:300 }} value={cartItem.quantity} onChange={handleInputChange}></Input>
                                <h3 style={{ color:'#2E3696', fontWeight:900 }}>${ cartItem.price*cartItem.quantity }</h3>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Card>
    )
}