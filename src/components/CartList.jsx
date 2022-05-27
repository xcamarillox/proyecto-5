import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Button } from 'antd';
import { PayPalButtons } from "@paypal/react-paypal-js";

import CartCardItem from "./CartMovieItem";
import { getContextType } from "../context/AppContext";

const CartList = () => {
    const { _cart:[cart] } = getContextType('MoviesContext');
    const [isCheckOutMode, setIsCheckOutMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const getCartTotals = () => {
        let totalCount = { quantity:0, price:0, quantityLabel:'', priceLabel:'' };
        cart.forEach((cartItem) => {
            totalCount.price += (cartItem.price * cartItem.quantity);
            totalCount.quantity += cartItem.quantity;
        })
        if (totalCount.quantity == 1) totalCount.quantityLabel = '1 Item';
        else totalCount.quantityLabel = totalCount.quantity + ' Items';
        totalCount.priceLabel = '$' + totalCount.price + ' USD';
        //console.log(totalCount);
        return totalCount
    } 

    const PayPalButtonsCreateOrderHandler = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "1.99",
                    },
                },
            ],
        });
    }

    const PayPalButtonsOnApproveHandler = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    }

    const handleLink = () => {
        if (isCheckOutMode) navigate("/cart", { replace: true });
        else navigate("/checkout", { replace: true });
    };

    useEffect(()=>{
        const locationSplit = location.pathname.split('/')[1];
        if (locationSplit == 'cart') setIsCheckOutMode(false)
        else setIsCheckOutMode(true)
      }, [location])
    
    const cartTotal = getCartTotals();
    const amount = "2";
    const currency = "USD";
    const style = {"layout":"vertical", color:'silver'};
    return (
        <Card
            title={
              <>
                <h2 style={{ color:'#F7EC40' }}>
                    { isCheckOutMode?`Checkout`:`Your Cart: Total ${cartTotal.priceLabel}` }
                </h2>
                <Button 
                    style={{backgroundColor:'rgb(249, 241, 121)', color:'#2E3696'}} 
                    onClick={handleLink}
                >
                    { isCheckOutMode?'← To Cart':'CheckOut → '+ cartTotal.quantityLabel }
                </Button>
              </>
            }
            headStyle={{
              backgroundColor:'#2E3696',
              color:'#F7EC40',
              textAlign:'center'
            }}
            style={{ margin:30, borderColor:'#2E3696' }}
        >
            { isCheckOutMode && 
            <Card 
                bordered={isCheckOutMode}
                title={ isCheckOutMode && <h3 style={{ color:'#2E3696' }}>Choose A Payment Method</h3> }
                headStyle={{
                    backgroundColor:'rgba(247, 236, 64, 0.5)',
                    textAlign:'center'
                }}
                style={{ 
                    marginTop:5, 
                    borderColor:'rgba(247, 236, 64, 0.8)', 
                    width:'100%', 
                    textAlign:'center' 
                }}
            >
                <h2 style={{ display:'flex', justifyContent:'center' }}>
                    Total {cartTotal.priceLabel} in {cartTotal.quantityLabel}
                </h2>
                <div>
                    <PayPalButtons
                        style={style}
                        disabled={false}
                        fundingSource={undefined}
                        forceReRender={[amount, currency, style]}
                        onApprove={PayPalButtonsOnApproveHandler}
                        createOrder={PayPalButtonsCreateOrderHandler}
                    />
                </div>
            </Card> }
            <Card 
                bordered={isCheckOutMode}
                title={ isCheckOutMode && <h3 style={{ color:'#F7EC40' }}>Your Items</h3> }
                headStyle={{
                    backgroundColor:'#2E3696',
                    textAlign:'center'
                }}
                style={{ 
                    borderColor:'#2E3696', 
                    width:'100%', 
                    textAlign:'center', 
                    marginTop:isCheckOutMode?40:0,  
                }}
            >
                { cart.map((cartItem, index) => (
                    <CartCardItem 
                        isCheckOutMode = { isCheckOutMode }
                        cartItem={cartItem} 
                        key={ cartItem.movie.id } 
                        itemIndex={index} 
                    />
                ))}
            </Card>
        </Card>
    )
}

export default CartList;