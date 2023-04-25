import dropDown from '../assets/images/icons/drop_down.svg';
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

import '../assets/styles/LoginedUI.css'

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../store/actions/auth';
import { clearFavorite } from '../services/favoriteSlice';
import { clearCart } from '../services/cartSlice';

export default function UserBar() {
    const [open, setOpen] = useState(false);
    const variants = {
        rotate: { rotate: 0 , transition: { duration:0.5 } },
        stop: { rotate: 180 , transition: { duration: 0.5 } }
    }
    const { user } = useSelector(state => state.auth)

    const { fullName, email } = user
    const firstLettersOfFullname = fullName.split(' ')[0].split('')[0] + fullName.split(' ')[1].split('')[0]

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = useCallback(() => {
        dispatch(logout());
        dispatch(clearFavorite());
        dispatch(clearCart());
        navigate('/');
    }, [dispatch, navigate]);

    return (
        <div className='user__ui'>
            <p className='user__name'>
                Welcome, {fullName}!
            </p>
            <div className='user__icon' onClick={() => setOpen(!open)}>
                {firstLettersOfFullname}
            </div>
            <motion.img className='user__drop_down'
                variants={variants}
                animate={open ? 'stop' : 'rotate'}
                src={dropDown}
                onClick={() => setOpen(!open)}
            />
            {open && (<AnimatePresence>
                    <motion.ul
                        key={'UserBar'}
                        className='drop_down__ul'
                        initial={{opacity:0, scaleY:0, y:-120}}
                        animate={{opacity:1, scaleY:1, y:0, transition:{duration:0.5}}}
                        exit={{opacity:0, scaleY : 0, y:-70}}
                    >
                        <li className='drop_down__li'>
                            <p>
                                {fullName}
                            </p>
                            <p>
                                {email}
                            </p>
                        </li>
                        <hr className='drop_down__hr' />
                        <li className='drop_down__li' 
                            onClick={() => {
                                setOpen(false);
                                navigate('/account')
                            }}
                        >
                            Settings
                        </li>
                        <li className='drop_down__li logout' onClick={logOut}>
                            Log Out
                        </li>
                    </motion.ul>
            </AnimatePresence>
            )}
        </div>
    )
}
