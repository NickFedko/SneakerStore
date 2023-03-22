import logo from '../assets/images/icons/logo.svg';
import favourite from '../assets/images/icons/favourite_active.svg';
import basket from '../assets/images/icons/basket.svg';
import '../assets/styles/Header.css'
import { Link } from 'react-router-dom';
import UserBar from './UserBar';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthModal from './modals/AuthModal';

import { useSelector } from 'react-redux';
import { getFavorites } from '../services/api/favorites';

export default function Header() {
    const { isLoggedIn } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cartReducer)
    const [amountOfFavoriteProducts, setAmountOfFavoriteProducts] = useState(0);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [formType, setFormType] = useState('');
    

    const openLoginModal = () => {
        setOpenAuthModal(true);
        setFormType('login');
    }

    const openRegisterModal = () => {
        setOpenAuthModal(true);
        setFormType('register');
    }

    useEffect(() => {
        if(isLoggedIn) {
            getFavorites()
                .then(res => setAmountOfFavoriteProducts(res.data.length))
        }
    },[amountOfFavoriteProducts, isLoggedIn])

    return(
        <header>
            <div className='header__logo__block'>
                <Link to='/'>
                    <img className='header__logo' src={logo} alt={'logo'}/>
                </Link>
            </div>
            <div className='header__interaction__block'>
                <Link to='/account/favourite'>
                    <button className='header__favourite__button'>
                        <img src={favourite} alt={'favourite__button'}/>
                        {isLoggedIn && amountOfFavoriteProducts > 0 &&<span>{amountOfFavoriteProducts}</span>}
                    </button>
                </Link>
                <Link to='/orders'>
                    <button className='header__basket__button'>
                        <img src={basket} alt={'basket__button'}/>
                        {isLoggedIn && cartItems.length > 0 &&<span>{cartItems.length}</span>}
                    </button>
                </Link>
                {isLoggedIn ?
                    <UserBar />
                    :
                    <>
                        <span
                            className='header__register__link'
                            onClick={() => openRegisterModal()}
                        >
                            register
                        </span>
                        <span className='header__vertical__line' />
                        <span
                            className='header__login__link'
                            onClick={() => openLoginModal()}
                        >
                            login
                        </span>
                    </>
                }
            </div>
            {openAuthModal && <AnimatePresence>
                    <AuthModal
                        type={formType}
                        setType={setFormType}
                        setOpenAuthModal={setOpenAuthModal}
                    />
                </AnimatePresence>
            }
        </header>
    )
}
