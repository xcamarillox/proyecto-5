
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
                backgroundColor:'#2E3696',
                color:'#F7EC40'
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
            style={{ margin:15, borderColor:'#2E3696' }}
        >
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