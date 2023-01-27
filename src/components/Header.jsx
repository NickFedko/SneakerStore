import logo from '../assets/images/logo.svg';
import favourite from '../assets/images/favourite.svg';
import basket from '../assets/images/basket.svg';
import '../assets/styles/Header.css'
import { Link } from 'react-router-dom';


export default function Header({openModal, openLoginModal}) {    
    return(
        <header>
            <div className='header__logo__block'>
                <Link to={'/'}>    
                    <img className='header__logo' src={logo} />
                </Link>
            </div>
            <div className='header__interaction__block'>
                <button className='header__favourite__button'><img src={favourite} /></button>
                <Link to={'/orders'}>
                    <button className='header__basket__button'><img src={basket} /></button>
                </Link>
                <a 
                    className='header__register__link' 
                    onClick={() => openModal(true)} 
                >
                    register
                </a>
                <span />
                <a 
                    className='header__login__link'
                    onClick={() => openLoginModal(true)}
                >
                    login
                </a>
            </div>
        </header>
    )
}
