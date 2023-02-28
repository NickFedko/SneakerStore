import closeIcon from '../../assets/images/icons/close.svg';
import '../../assets/styles/Modal.css';
import { motion } from 'framer-motion';
import OrderItem from '../OrderItem';

export default function OrderModal( {setOpenOrderModal} ) {
    return(
        <div className="modal__overlay">
            <div className="modal__container">
                <div className="modal__container__orders">
                    <button 
                        className="modal__close-button"
                        onClick={() => setOpenOrderModal(false)}
                        type='button'
                    >
                        <img src={closeIcon} alt="close_button"/>
                    </button>
                    <h2>Order details ID 333333</h2>
                    <OrderItem /> 
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
            </div>
        </div>
    )
}