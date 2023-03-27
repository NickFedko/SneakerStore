import logo from '../assets/images/icons/logo.svg';
import favourite from '../assets/images/icons/favourite_active.svg';
import basket from '../assets/images/icons/basket.svg';
import '../assets/styles/Header.css'
import { Link } from 'react-router-dom';
import UserBar from './UserBar';
import {  useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthModal from './modals/AuthModal';

import { useSelector, useDispatch } from 'react-redux';
import { getFavorites } from '../services/api/favorites';
import { checkFavorite } from '../services/favoriteSlice';
import { useNavigate } from 'react-router-dom';
import NotLoggedInModal from './modals/NotLoggedInModal';

export default function Header() {
    const { isLoggedIn } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cartReducer);
    const { favoriteItems } = useSelector(state => state.favoriteReducer);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [openNotLoggedInModal, setOpenNotLoggedInModal] = useState(false);
    const [formType, setFormType] = useState('');
    const [favorites, setFavorites] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn) {
            getFavorites()
                .then((res) => {
                    setFavorites(res.data);
                    dispatch(checkFavorite(favorites));
            });
        }
    }, [isLoggedIn, dispatch])
    

    const openLoginModal = () => {
        setOpenAuthModal(true);
        setFormType('login');
    }

    const openRegisterModal = () => {
        setOpenAuthModal(true);
        setFormType('register');
    }

    const openFavoriteSection = () => {
        isLoggedIn 
            ? navigate('/account/favourite')
            : setOpenNotLoggedInModal(true);
    }

    return(
        <header>
            <div className='header__logo__block'>
                <Link to='/'>
                    <img className='header__logo' src={logo} alt={'logo'}/>
                </Link>
            </div>
            <div className='header__interaction__block'>
                <button 
                    className='header__favourite__button'
                    onClick={() => openFavoriteSection()}
                >
                    <img src={favourite} alt={'favourite__button'}/>
                    {isLoggedIn && favoriteItems.length > 0 &&<span>{favoriteItems.length}</span>}
                </button>
                <Link to='/orders'>
                    <button className='header__basket__button'>
                        <img src={basket} alt={'basket__button'}/>
                        {cartItems.length > 0 &&<span>{cartItems.length}</span>}
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
            <AnimatePresence>
                {openAuthModal && 
                    <AuthModal
                        type={formType}
                        setType={setFormType}
                        setOpenAuthModal={setOpenAuthModal}
                    />
                }
                {openNotLoggedInModal && 
                    <NotLoggedInModal 
                        setOpenNotLoggedInModal={setOpenNotLoggedInModal}
                        setOpenAuthModal={setOpenAuthModal}
                        setFormType={setFormType}
                    />
                }
            </AnimatePresence>
        </header>
    )
}
