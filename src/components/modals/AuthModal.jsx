import { motion } from "framer-motion";


import '../../assets/styles/Modal.css';
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import closeIcon from "../../assets/images/icons/close.svg";

export default function AuthModal({ setOpenAuthModal, type, setType }) {
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
                        onClick={() => setOpenAuthModal(false)}
                    >
                        <img src={closeIcon} alt={'close icon'}/>
                    </button>
                    {type === 'login' 
                        ? <LoginForm setOpenAuthModal={setOpenAuthModal}/> 
                        : <RegisterForm setOpenAuthModal={setOpenAuthModal}/>
                    }
                </motion.div>   
            <motion.div 
                className="modal__login__transfer" 
                initial={{scale:0}}
                animate={{scale:1}}
                transition={{duration:0.5}}
                exit={{scale:0}}
            >
                { type === 'login' 
                    ? (<p>I have no account, <span onClick={() => setType('register')}>Register now</span> </p>)
                    : (<p>I already have an account, <span onClick={() => setType('login')} >Log In</span></p>)
                }
            </motion.div>
        </motion.div>
    )
}