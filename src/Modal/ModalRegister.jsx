import close from '../assets/images/close.svg';
import '../assets/styles/ModalRegister.css';
import {  motion } from 'framer-motion';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { setUser  } from '../UserStore/Slice/userSlice';

import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


export default function ModalRegister({openModal, openLoginModal}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('')

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    const dispatch = useDispatch();
    const history = useNavigate();
 
    const handleSignUp = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                history('/');
                openModal(false);
            })
            .catch(console.error)
    }

    return(
            <motion.div 
                className='modal__overlay' 
                onClick={() => openModal(false)}
                initial={{opacity:0}}
                animate={{
                    opacity:1,
                    transition:{duration:0.5}
                }}
                exit={{opacity:0}}
            >
                <motion.div 
                    className="modal__container" 
                    onClick={(e) => e.stopPropagation()}
                    initial={{scale:0}}
                    animate={{
                        scale:1,
                        transition: {duration:0.5}
                    }}
                    exit={{scale:0}}
                >
                <button 
                    className="modal__close-button" 
                    onClick={() => openModal(false)}
                >
                    <img src={close} />
                </button>
                <h2>Register</h2>
                <div className='input__container'>
                    <input type="text" name="fullname" required />
                    <span className="label__span">Full Name</span>
                </div>
                <div className='input__container'>
                    <input 
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <span>Email</span>
                </div>
                <div className='input__container'>
                    <input type="tel" name="tel" required />
                    <span>Phone</span>
                </div>
                <div className='input__container'>
                    <input 
                        type={passwordShown ? 'text' : 'password'} 
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <span>Password</span>
                    <button 
                        className='input__container__password__button'
                        onClick={togglePassword}
                    />
                </div>
                <button 
                    onClick={(e) => handleSignUp(email, password)}
                >
                    Register
                </button>
            </motion.div>
            <motion.div 
                className="modal__login__transfer" 
                onClick={() => openLoginModal(true)}
                initial={{scale:0}}
                animate={{scale:1}}
                transition={{duration:0.5}}
                exit={{scale:0}}
            >
                <p>I already have an account, <a>Log In</a> </p>
            </motion.div>
        </motion.div>
    )
}