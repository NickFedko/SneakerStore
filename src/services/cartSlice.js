import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const notify = (message) => toast(message, {
    type: 'default',
    autoClose: 2000,
    theme: 'colored'
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex( 
                (item) => item.id === action.payload.id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity +=1;
            } else {
                const tempProduct = {...action.payload, cartQuantity: action.payload.amount};
                state.cartItems.push(tempProduct);
                notify(`${action.payload.title} added to cart`)
            }
        },
        removeFromCart(state, action) {
            const nextCartItems =  state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )

            state.cartItems = nextCartItems
            notify(`${action.payload.title} removed from cart`)
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )

            if(state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -=1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems =  state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
    
                state.cartItems = nextCartItems
                notify(`${action.payload.title} removed from cart`)
            }
        },
        getTotals(state, action) {
            let {total, quantity} = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal
            }, {
                total: 0,
                quantity: 0
            })

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart(state, action) {
            state.cartItems = [];
        }
    },
});

export const { addToCart, removeFromCart, decreaseCart, getTotals, clearCart } = cartSlice.actions

export default cartSlice.reducer;