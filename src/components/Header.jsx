import logo from '../assets/images/icons/logo.svg';
import favourite from '../assets/images/icons/favourite_active.svg';
import basket from '../assets/images/icons/basket.svg';
import '../assets/styles/Header.css'
import { Link } from 'react-router-dom';
import UserBar from './UserBar';

import { useSelector } from 'react-redux';

export default function Header({openModal, openLoginModal, setLogined}) {
    const {isLoggedIn} = useSelector(state => state.auth)
    return(
        <header>
            <div className='header__logo__block'>
                <Link to={'/'}>    
                    <img className='header__logo' src={logo} alt={'logo'}/>
                </Link>
            </div>
            <div className='header__interaction__block'>
                <button className='header__favourite__button'><img src={favourite} alt={'favourite__button'}/></button>
                <Link to={'/orders'}>
                    <button className='header__basket__button'><img src={basket} alt={'basket__button'}/></button>
                </Link>
                {isLoggedIn ?
                    <UserBar setLogined={setLogined} />
                    :
                    <>
                        <span
                            className='header__register__link' 
                            onClick={() => openModal(true)} 
                        >
                            register
                        </span>
                        <span />
                        <span
                            className='header__login__link'
                            onClick={() => openLoginModal(true)}
                        >
                            login
                        </span>
                    </>
                }
            </div>
        </header>
    )
}
