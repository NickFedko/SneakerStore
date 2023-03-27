import closeIcon from '../../assets/images/icons/close.svg';
import '../../assets/styles/Modal.css';
import { motion } from 'framer-motion';
import OrderItem from '../OrderItem';
import { useEffect, useState } from 'react';
import { getOrder } from '../../services/api/orders';

export default function OrderModal( {setOpenOrderModal, orderId} ) {
    const [orderInfo, setOrderInfo] = useState([]);

    useEffect(() => {
        getOrder(orderId)
            .then(res => setOrderInfo(res.data))
    }, [orderId])

    const orderQuantity = orderInfo && orderInfo.items 
        ? orderInfo.items.map(item => item.quantity).reduce((a, b) => a + b, 0) 
        : 0;

    const orderItems = orderInfo && orderInfo.items
        ? orderInfo.items
        : [];

    const formatOrderDate = (date) => {
        const current = new Date(date);
        const orderDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        return orderDate;
    }
 
    return(
        <motion.div 
            className="modal__overlay"
            initial={{opacity:0}}
            animate={{
                opacity: 1,
                transition:{duration:0.5}
            }}
            exit={{opacity:0}}
        >
            <motion.div 
                className="modal__container"
                initial={{scale:0}}
                animate={{
                    scale:1,
                    transition: {duration:0.5}
                }}
                exit={{scale:0}}
            >
                <div className="modal__container__orders">
                    <button 
                        className="modal__close-button"
                        onClick={() => setOpenOrderModal(false)}
                        type='button'
                    >
                        <img src={closeIcon} alt="close_button"/>
                    </button>
                    <h2>Order details ID {orderInfo.id}</h2>
                    {orderInfo && orderItems.map((item, index) => 
                        <OrderItem key={index} orderedProduct={item}/>
                    )}
                    <div className='modal__container__orders__info'>
                        <div>
                            <p>Date: <span>{formatOrderDate(orderInfo.createdAt)}</span></p>
                            <p>Address: 
                                <span>
                                    {orderInfo && orderInfo.shipment && orderInfo.shipment.address}, 
                                    {orderInfo && orderInfo.shipment && orderInfo.shipment.city}, 
                                    {orderInfo && orderInfo.shipment && orderInfo.shipment.country}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p>Items: <span>{orderQuantity}</span></p>
                            <p>Total: <span>${orderInfo.totalPrice}</span></p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}