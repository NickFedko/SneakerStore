import { motion } from "framer-motion";
import axios from "axios";
import { useState } from 'react';

import close from '../assets/images/close.svg';
import '../assets/styles/ModalLogin.css';


export default function ModalLogin({openLoginModal, openModal, setLogined}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    
    async function signIn(e, email, password) {
        e.preventDefault();
        let item={ 
            email, 
            password
        };
        let result = await axios({
            method: 'POST',
            url: "https://demo-api.apiko.academy/api/auth/login",
            data: item,
            headers: {
                "Content-type": "application/json",
                "accept": "application/json", 
            }
        });
        await openLoginModal(false);
        console.log(result);
        let token = result.data.token;
        localStorage.setItem('token', token)
        token = localStorage.getItem('token');
        let account = await axios({
            url:"https://demo-api.apiko.academy/api/account", 
            method: 'GET',
            headers: {
                "accept": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        console.log(account);
        localStorage.setItem('data', JSON.stringify(account.data))
        setLogined(true);
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
                    className="modal__container" 
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={(e) => signIn(e, email, password)}
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
                            type="text" 
                            name="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            pattern='\S+@\S+'
                            placeholder=' '
                            required 
                        />
                        <span>Email</span>
                        <label className='modal__container__input_error'>Enter your email</label>
                    </div>
                    <div className='input__container'>
                    <input 
                        type={passwordShown ? 'text' : 'password'} 
                        name="password"
                        value={password}
                        minLength='8'
                        maxLength='35'
                        onChange={(e) => setPassword(e.target.value)} 
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,35}$"
                        placeholder=' '
                        required 
                    />
                        <span>Password</span>
                        <label className='modal__container__input_error'>Should contain at least 1 letter, 1 special symbol, 1 number</label>
                        <button 
                            type="button"
                            className='input__container__password__button'
                            onClick={togglePassword}
                        />
                    </div>
                    <button
                        type="submit"
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