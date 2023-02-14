import dropDown from '../assets/images/icons/drop_down.svg';
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Link, useNavigate } from 'react-router-dom';

import '../assets/styles/LoginedUI.css'

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../store/actions/auth';

export default function UserBar({setLogined} ) {
    const [open, setOpen] = useState(false);
    const variants = {
        rotate: { rotate: 0 , transition: { duration:0.5 } },
        stop: { rotate: 180 , transition: { duration: 0.5 } }
    }
    const { data } = useSelector(state => state.auth.user)

    const {fullName, email} = data
    const firstLettersOfFullname = fullName.split(' ')[0].split('')[0] + fullName.split(' ')[1].split('')[0]

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = useCallback(() => {
        dispatch(logout());
        navigate("/")
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
            <AnimatePresence>
                {open && (
                    <motion.ul 
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
                        <Link to='/account'>
                            <li className='drop_down__li' onClick={() => setOpen(false)}>
                                Settings
                            </li>
                        </Link>
                        <li className='drop_down__li logout' onClick={logOut}>
                            Log Out
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}