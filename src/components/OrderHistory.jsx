import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import OrderModal from "./modals/OrderModal";
import { useSelector } from "react-redux";
import '../assets/styles/UserPage.css'
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/api/orders";

export default function OrderHistory() {
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState(0);

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        getOrders()
            .then(res => setOrders(res.data))
    }, [])

    const { fullName } = user;

    const initials = fullName.split(' ')[0].split('')[0] + fullName.split(' ')[1].split('')[0];

    const navigate = useNavigate();

    const handleOrderModal = (id) => {
        setOrderId(id);
        setOpenOrderModal(true);
    }

    return (
        <div className="user_page">
            <div className="user_page__image">
                {initials}
            </div>
            <h3>{fullName}</h3>
            <div className="user_page__nav">
                <button
                    className='user_page__nav_button'
                    onClick={() => navigate('/account')}
                >
                    Edit Account
                </button>
                <button
                    className='user_page__nav_button active'
                    onClick={() => navigate('/account/order_history')}
                >
                    Orders History
                </button>
                <button
                    className='user_page__nav_button'
                    onClick={() => navigate('/account/favourite')}
                >
                    Favourites
                </button>
            </div>
            {orders.map((order, index) => (
                <div
                    className="order_history__container"
                    onClick={() => handleOrderModal(order.id)}
                    key={index}
                >
                    <div className="order_history__container__label">
                        <p>Order ID: <span>{order.id}</span></p>
                        <p>Date: <span>{order.createdAt}</span></p>
                    </div>
                    <p>Price <span>$ {order.totalPrice}</span></p>
                </div>
            ))}
            <AnimatePresence>
                { openOrderModal &&
                    <OrderModal 
                        setOpenOrderModal={setOpenOrderModal}
                        orderId={orderId}
                    />
                }
            </AnimatePresence>
        </div>
    )
}
