import close from '../assets/images/close.svg';
import '../assets/styles/ModalRegister.css';

import {  motion } from 'framer-motion';

import { useState, useEffect } from 'react';

import { FadeLoader } from 'react-spinners';

export default function ModalRegister({openModal, openLoginModal}) {
    const [passwordShown, setPasswordShown] = useState(false);

    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    async function signUp(e, email, password, phone, fullName) {
        e.preventDefault();
        setLoading(true)
        let item={ 
            email, 
            password,
            phone, 
            fullName,
        };
        let result = await fetch("https://demo-api.apiko.academy/api/auth/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json"
            }
        });
        setLoading(false)
        openModal(false);
        console.log(result);
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
                <FadeLoader 
                    loading={loading} 
                    style={{
                        position: 'absolute', 
                        zIndex:1,
                        left: '50%',
                        top: '40%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
                
                <motion.form 
                    className="modal__container" 
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={(e) => signUp(e, email, password, phone, fullName)}
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
                    <input 
                        type="text" 
                        name="fullname"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        pattern="^[a-zA-Z\s]+$"
                        placeholder=' '
                        required 
                    />
                    <span className="label__span">Full Name</span>
                    <label className='modal__container__input_error'>Only letters. Cannot have special characters and numbers</label>
                </div>
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
                    <label className='modal__container__input_error'>Enter valid email</label>
                </div>
                <div className='input__container'>
                    <input 
                        type="text" 
                        name="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} 
                        pattern='^(\+)?([0-9]){10,14}$'
                        placeholder=' '
                        required 
                    />
                    <span>Phone</span>
                    <label className='modal__container__input_error'>Should contain 10-14 numbers, can have optional + at the beginning</label>
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
                        className='input__container__password__button'
                        onClick={togglePassword}
                    />
                </div>
                <button 
                    type="submit"
                >
                    Register
                </button>
            </motion.form>
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