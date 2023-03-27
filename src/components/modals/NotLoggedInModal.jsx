import { motion } from "framer-motion";
import closeIcon from '../../assets/images/icons/close.svg';
import '../../assets/styles/Modal.css';


export default function NotLoggedInModal( {setOpenNotLoggedInModal, setOpenAuthModal, setFormType} ) {
    const openLoginModal = () => {
        setOpenAuthModal(true);
        setOpenNotLoggedInModal(false);
        setFormType('login');
    }

    const openRegisterModal = () => {
        setOpenAuthModal(true);
        setOpenNotLoggedInModal(false);
        setFormType('register');
    }

    return ( 
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
                <div className="modal__container__not_logged_in">
                    <button 
                        className="modal__close-button"
                        type='button'
                        onClick={() => setOpenNotLoggedInModal(false)}
                    >
                        <img src={closeIcon} alt="close_button"/>
                    </button>
                    <h2>To continue please register or log in</h2>
                    <button onClick={() => openLoginModal()}>
                        Continue to sign in
                    </button>
                    <button onClick={() => openRegisterModal()}>
                        Continue to register
                    </button>
                    <button onClick={() => setOpenNotLoggedInModal(false)}>
                        Continue as guest
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}