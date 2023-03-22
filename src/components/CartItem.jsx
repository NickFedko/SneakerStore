import { useDispatch } from "react-redux"
import { removeFromCart, decreaseCart, addToCart } from "../services/cartSlice";

export default function CartItem({product}) {
    const dispatch = useDispatch();

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem))
    }
    
    const handleIncreaseCart = (cartItem) => {
        dispatch(addToCart(cartItem))
    }

    return(
        <div className="cart__item__container">
            <img alt='cart_item' src={product.picture}/>
            <div className="cart__item__container__info">
                <p>{product.title}</p>
                <div className="cart__item__container__info__action">
                    <button 
                        className="cart__item__container__info__action__delete" 
                        type="button"
                        onClick={() => handleRemoveFromCart(product)}
                    />
                    <button type="button" onClick={() => handleDecreaseCart(product)}>
                        -
                    </button>
                    <p>{product.cartQuantity}</p>
                    <button type="button" onClick={() => handleIncreaseCart(product)}>
                        +
                    </button>
                </div>
            </div>
            <div className="cart__item__container__info__price">
                <p>Price:</p>
                <p>${product.price*product.cartQuantity}</p>
            </div>
        </div>
    )
}