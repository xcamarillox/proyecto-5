import { Card } from 'antd';

import CartCardItem from "./CartCardItem";
import { getContextType } from "../context/AppContext";

const CartList = () => {
    const { _cart:[cart] } = getContextType('MoviesContext');
    const getCartTotal = () => {
        let totalCount = 0;
        cart.forEach((cartItem, index) => {
            totalCount += (cartItem.price * cartItem.quantity);
        })
        //console.log(totalCount);
        return totalCount
    } 
    const cartTotal = getCartTotal();

    return (
        <>
            <h1 style={{ textAlign:'center', marginTop: 30, color:'#2E3696' }}>Your Cart (${cartTotal})</h1>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', padding: 20 }}>
                { cart.map((cartItem, index) => <CartCardItem cartItem={cartItem} key={ cartItem.movie.id } itemIndex={index} />) }
                <Card style={{ marginTop:5, borderColor:'#2E3696', width:'100%' }}>
                    <h2 style={{ display:'flex', justifyContent:'flex-end' }}>
                        Total ${cartTotal}
                    </h2>
                </Card>
            </div>
        </>
    )
}

export default CartList;