import CartItem from "../components/CartItem";
import CartForm from "../components/forms/CartForm";
import '../assets/styles/CartPage.css';

export default function CartPage() { // rename page
    return(
        <div className="cart__page">
            <h2>My cart</h2>
            <div className="cart__page__list__items__form">
                <div className="cart__page__list__items">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <CartForm />
            </div>
        </div>
    )
}