import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';

import { getImgEndpoint } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";
import PriceAndAddToCart from "./PriceAndAddToCart";

import question from "../../assets/question.png"

export default ({movie}) => {
    const navigate = useNavigate();
    const { 
        _pickedMovie:[pickedMovie, setPickedMovie], 
    } = getContextType('MoviesContext');

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
                <PriceAndAddToCart movie={movie}/>
        </Card>
    )
}