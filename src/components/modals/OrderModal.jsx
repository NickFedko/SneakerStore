import closeIcon from '../../assets/images/icons/close.svg';
import '../../assets/styles/Modal.css';
import { motion } from 'framer-motion';
import OrderItem from '../OrderItem';
import { useEffect, useState } from 'react';
import { getOrder } from '../../services/api/orders';

export default function OrderModal( {setOpenOrderModal, orderId} ) {
    const [orderInfo, setOrderInfo] = useState([]);

    useEffect(() => {
        console.log(orderId);
    }, [])

    return(
        <motion.div 
            className="modal__overlay"
            initial={{opacity:0}}
            animate={{
                opacity:0.5,
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
                    <h2>Order details ID 333333</h2>
                    {/* <OrderItem />  */}
                    <div className='modal__container__orders__info'>
                        <div>
                            <p>Date: <span>05/10/2021</span></p>
                            <p>Address: <span>13 Street, Kyiv, Ukraine</span></p>
                        </div>
                        <div>
                            <p>Items: <span>4</span></p>
                            <p>Total: <span>$555.14</span></p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}