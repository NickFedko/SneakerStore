import { useEffect, useState } from 'react';

import close from '../../assets/images/close.svg';
import '../../assets/styles/ModalLogin.css';
import postLogin from "../../services/api/login";


export default function Login({setOpenLoginModal}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const [token, setToken] = useState('')

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    useEffect(() => {
        postLogin(email, password).then(response => {
            console.log(response.data);
            setToken(response.data.token);
        }).catch(error => console.log(error))
            .finally(() => {
            console.log('Experiment completed');
        })
    }, [])

    return(
        <>
            <button 
                className="modal__close-button" 
                onClick={() => setOpenLoginModal(false)}
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
            >
                Login
            </button>
        </>
    )
}