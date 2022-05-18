
import { Card, Image, Row, Col } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { getImgEndpoint } from '../scripts/api-helpers';


export default ({cartItem}) => {
    const movie = cartItem.movie;
    return (
        <Card 
        title={
            <>
                <div>{movie.title}</div>
                { movie.release_date && 
                    <div>
                        {movie.release_date + ' '} 
                    </div> 
                }
            </>
        }
        headStyle={{
            backgroundColor:'rgb(33, 37, 41)',
            color:'white'
        }}
        extra={
            <div style={{ color:'white' }}>
                { movie.vote_average? 
                    <>
                        {movie.vote_average} / 10 <StarFilled style={{ color:'yellow' }}/>
                    </>: 'No votada'
                }
            </div>
        }
        style={{ margin:15 }}>
            <Card type='inner' bordered={false}>
                <Row justify="space-evenly" align='middle'>
                    <Col lg={4}>
                        { movie.poster_path && <Image src={ movie.poster_path && getImgEndpoint(movie.poster_path) } style={{ maxHeight: 300 }} /> }
                    </Col>
                    <Col xs={24} sm={24} md={16} style={{margin:10}}>
                        <p>{movie.overview}</p>
                    </Col>
                </Row>
            </Card>
        </Card>
    )
}