import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import OrderModal from "./modals/OrderModal";

export default function OrderHistory() {
    const [openOrderModal, setOpenOrderModal] = useState(false);
    
    return (
        <div 
            className="order_history__container"
            onClick={() => setOpenOrderModal(true)}
        >
            <div className="order_history__container__label">
                <p>Order ID: <span>333333</span></p>
                <p>Date: <span>06.04.2021</span></p>
            </div>
            <p>Price <span>$ 175.19</span></p>
            {openOrderModal && 
                <OrderModal setOpenOrderModal={setOpenOrderModal}/>
            }
        </div>
    )
}