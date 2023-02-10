import { motion } from "framer-motion";


import '../../assets/styles/ModalLogin.css';
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import closeIcon from "../../assets/images/close.svg";

export default function AuthModal({ openLoginModal, setOpenLoginModal, openRegisterModal, setOpenRegisterModal }) {
    const loginTransfer = () => {
        setOpenLoginModal(false);
        setOpenRegisterModal(true);
    }
    const registerTransfer = () => {
        setOpenRegisterModal(false);
        setOpenLoginModal(true);
    }

    return(
            <motion.div 
                className='modal__overlay' 
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
                    <button
                        className="modal__close-button"
                        onClick={() => setOpenLoginModal(false)}
                        style={{border: '1px solid red'}}
                    >
                        <img src={closeIcon} alt={'close icon'}/>
                    </button>
                    {openRegisterModal && <RegisterForm setOpenRegisterModal={setOpenRegisterModal}/>}
                    {openLoginModal && <LoginForm setOpenLoginModal={setOpenLoginModal}/>}
                </motion.div>   
            <motion.div 
                className="modal__login__transfer" 
                initial={{scale:0}}
                animate={{scale:1}}
                transition={{duration:0.5}}
                exit={{scale:0}}
            >
                {openLoginModal &&(<p>I have no account, <span onClick={e => loginTransfer()}>Register now</span> </p>)}
                {openRegisterModal && (<p>I already have an account, <span onClick={e => registerTransfer()}>Log In</span></p>)}
            </motion.div>
        </motion.div>
    )
}