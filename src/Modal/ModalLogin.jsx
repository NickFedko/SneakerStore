import { motion } from "framer-motion";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../UserStore/Slice/userSlice";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import close from '../assets/images/close.svg';

import '../assets/styles/ModalLogin.css';

export default function ModalLogin({openLoginModal, openModal}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    const dispatch = useDispatch();
    const history = useNavigate();

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                history('/');
                openLoginModal(false);
            })
            .catch(() => alert('Invalid user!'))
    }
    
    return(
            <motion.div 
                className='modal__overlay' 
                onClick={() => openLoginModal(false)}
                initial={{opacity:0}}
                animate={{
                    opacity:1,
                    transition:{duration:0.5}
                }}
                exit={{opacity:0}}
            >
                <motion.form
                    autoComplete="off" 
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
                    onClick={() => openLoginModal(false)}
                >
                    <img src={close} />
                </button>
                <h2>Login</h2>
                <div className='input__container'>
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                    <span>Email</span>
                </div>
                <div className='input__container'>
                    <input 
                        type={passwordShown ? 'text' : 'password'} 
                        name="password" 
                        required 
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)}
                    />
                    <span>Password</span>
                    <button 
                        type="button"
                        className='input__container__password__button'
                        onClick={togglePassword}
                    />
                </div>
                <button
                    type="button"
                    onClick={(e) => handleLogin(email, password)}
                >
                    Login
                </button>
            </motion.form>
            <motion.div 
                className="modal__login__transfer" 
                onClick={() => openModal(true)}
                initial={{scale:0}}
                animate={{scale:1}}
                transition={{duration:0.5}}
                exit={{scale:0}}
            >
                <p>I have no account, <a>Register now</a> </p>
            </motion.div>
        </motion.div>
    )
}