import closeIcon from '../../assets/images/icons/close.svg';
import '../../assets/styles/Modal.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PurchaseModal({setOpenPurchaseModal}) {
    const navigate = useNavigate();

    return (
        <motion.div 
            className="modal__overlay"
            initial={{opacity:0}}
            animate={{
                opacity:1,
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
                <div className='modal__container__purchase'>
                    <button 
                        className="modal__close-button"
                        onClick={() => setOpenPurchaseModal(false)}
                        type="button"
                    >
                        <img src={closeIcon} alt='close_button'/>
                    </button>
                    <h3>Thank you for your purchase</h3>
                    <p>We will send you a notification when your order arrives to you</p>
                    <button 
                        className='modal__container__purchase__button'
                        onClick={() => navigate('/')}
                    >
                        Continue shopping
                    </button>
                    <button 
                        className='modal__container__purchase__button'
                        onClick={() => navigate('/account/order_history')}
                    >
                        View order history
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}