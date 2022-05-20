import CartCardItem from "./CartCardItem";
import { getContextType } from "../context/AppContext";

const CartList = () => {
    const { _cart:[cart] } = getContextType('MoviesContext');

    return (
        <>
            <h1 style={{ textAlign:'center', marginTop: 30 }}>Your Cart</h1>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', padding: 20 }}>
                { cart.map((cartItem, index) => <CartCardItem cartItem={cartItem} key={ index } />) }
            </div>
        </>
    )
}

export default CartList;