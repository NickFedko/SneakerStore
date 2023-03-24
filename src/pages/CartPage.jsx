import CartItem from "../components/CartItem";
import CartForm from "../components/forms/CartForm";
import '../assets/styles/CartPage.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTotals } from "../services/cartSlice";

import PurchaseModal from "../components/modals/PurchaseModal";
import { AnimatePresence } from "framer-motion";

export default function CartPage() {
    const [openPurchaseModal, setOpenPurchaseModal] = useState(false);

    const { cartItems } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals())
    }, [cartItems, dispatch])

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
                        <CartForm setOpenPurchaseModal={setOpenPurchaseModal}/>
                    </div>
                </>
                : <h1>No items in cart</h1>
            }
            <AnimatePresence>
                { openPurchaseModal &&
                    <PurchaseModal key={'PurchaseModal'} setOpenPurchaseModal={setOpenPurchaseModal} />
                }
            </AnimatePresence>
        </div>

    )
}