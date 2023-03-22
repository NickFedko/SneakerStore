import CartItem from "../components/CartItem";
import CartForm from "../components/forms/CartForm";
import '../assets/styles/CartPage.css';
import { useSelector } from "react-redux";

export default function CartPage() {
    const { cartItems } = useSelector(state => state.cartReducer)


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