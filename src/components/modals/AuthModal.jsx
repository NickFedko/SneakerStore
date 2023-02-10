import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import '../../assets/styles/ModalLogin.css';
import Login from "./Login";
import Register from "./Register";

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
                    {openRegisterModal && <Register setOpenRegisterModal={setOpenRegisterModal}/>} 
                    {openLoginModal && <Login  setOpenLoginModal={setOpenLoginModal}/>} 
                </motion.div>   
            <motion.div 
                className="modal__login__transfer" 
                initial={{scale:0}}
                animate={{scale:1}}
                transition={{duration:0.5}}
                exit={{scale:0}}
            >
                {openLoginModal &&(<p>I have no account, <a onClick={e => loginTransfer()}>Register now</a> </p>)}
                {openRegisterModal && (<p>I already have an account, <a onClick={e => registerTransfer()}>Log In</a></p>)}
            </motion.div>
        </motion.div>
    )
}