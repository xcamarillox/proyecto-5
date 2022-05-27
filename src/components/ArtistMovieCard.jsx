import { useNavigate  } from 'react-router-dom';
import { Card, Image, Row, Col } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { getImgEndpoint } from '../scripts/api-helpers';
import PriceAndAddToCart from "./PriceAndAddToCart";

import question from "../../assets/question.png"

const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}

export default ({movie}) => {
    const navigate = useNavigate();
    const handleLinkToMovie = () => navigate("/movie/" + movie.id, { replace: true })
    return (
        <Card 
            title={
                <div 
                    onClick={handleLinkToMovie} 
                    style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }}
                >
                    <h3 style={{ color:'#F7EC40' }}>{movie.title}</h3>
                    <h4 style={{ color:'#F7EC40' }}>
                        { movie.release_date } 
                        { movie.release_date && getAge(movie.release_date)>1 && <> / {getAge(movie.release_date)} years</> }
                        { movie.vote_average? <><br />{movie.vote_average} / 10 <StarFilled/></>:<><br />No votes</> }
                    </h4>
                </div>
            }
            headStyle={{ backgroundColor:'#2E3696', color:'#F7EC40' }}
            style={{ marginTop:15 }}
        >
            <Row justify="space-evenly" align='middle'>
                <Col lg={4}>
                    <Image src={ movie.poster_path? getImgEndpoint(movie.poster_path): question } style={{ maxHeight: 300, cursor:'pointer' }} /> 
                </Col>
                <Col xs={24} sm={24} md={16} style={{margin:10}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <p>{movie.overview}</p>
                        <PriceAndAddToCart movie={movie} />
                    </div>
                </Col>
            </Row>
        </Card>
    )
}