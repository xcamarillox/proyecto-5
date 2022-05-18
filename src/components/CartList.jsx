import CartCardItem from "./CartCardItem";
import { getContextType } from "../context/AppContext";

const CartList = () => {
    const { _cart:[cart] } = getContextType('MoviesContext');

    return (
        <>
            <h2>Cart</h2>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', padding: 20 }}>
                { cart.map((cartItem, index) => <CartCardItem cartItem={cartItem} key={ index } />) }
            </div>
        </>
    )
}

export default CartList;