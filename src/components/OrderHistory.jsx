import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import OrderModal from "./modals/OrderModal";
import { useSelector } from "react-redux";
import '../assets/styles/UserPage.css'
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
    const [openOrderModal, setOpenOrderModal] = useState(false);

    const { data } = useSelector(state => state.auth.user);

    const { fullName } = data;

    const initials = fullName.split(' ')[0].split('')[0] + fullName.split(' ')[1].split('')[0];

    const navigate = useNavigate();
    
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
            <div 
                className="order_history__container"
                onClick={() => setOpenOrderModal(true)}
            >
                <div className="order_history__container__label">
                    <p>Order ID: <span>333333</span></p>
                    <p>Date: <span>06.04.2021</span></p>
                </div>
                <p>Price <span>$ 175.19</span></p>
                <AnimatePresence>
                    {openOrderModal && 
                        <OrderModal setOpenOrderModal={setOpenOrderModal}/>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}