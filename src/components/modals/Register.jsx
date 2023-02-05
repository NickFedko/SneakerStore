import close from '../../assets/images/close.svg';
import '../../assets/styles/ModalRegister.css';

import postRegister from '../../services/api/register';

import { useState, useEffect } from 'react';

export default function Register({setOpenRegisterModal}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    useEffect(()=> {
        postRegister(email, password, phone, fullName).then((response) =>{
            console.log(response);
        }).catch(error => console.log(error))
            .finally(() => {
            console.log('Expirement completed')
         })
    }, [])
    return(
        <>
            <button 
                className="modal__close-button" 
                onClick={() => setOpenRegisterModal(false)}
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
                    required 
                />
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
                <input 
                    type="tel" 
                    name="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                />
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
                type="button"
            >
                Register
            </button>
        </>
    )
}