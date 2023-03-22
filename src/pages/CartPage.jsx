import CartItem from "../components/CartItem";
import CartForm from "../components/forms/CartForm";
import '../assets/styles/CartPage.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTotals } from "../services/cartSlice";

export default function CartPage() {
    const { cartItems } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals())
    }, [cartItems])

    return(
        <div className="cart__page">
            {cartItems.length > 0
                ? <>
                    <h2>My cart</h2>
                    <div className="cart__page__list__items__form">
                        <div className="cart__page__list__items">
                            {cartItems.map((cartItem, index) => (
                                <CartItem 
                                    product={cartItem}
                                    key={index}
                                />
                            ))}
                        </div>
                        <CartForm />
                    </div>
                </>
                : <h1>No items in cart</h1>
            }
        </div>
    )
}