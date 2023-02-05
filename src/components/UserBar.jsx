import dropDown from '../assets/images/drop_down.svg';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import '../assets/styles/LoginedUI.css'

export default function UserBar({setLogined} ) {
    const [open, setOpen] = useState(false);
    const variants = {
        rotate: { rotate: 0 , transition: { duration:0.5 } },
        stop: { rotate: 180 , transition: { duration: 0.5 } }
    }
    const data = JSON.parse(localStorage.getItem('data'))

    const fullName = data.fullName;
    const email = data.email;
    const firstLettersOfFullname = fullName.split(' ')[0].split('')[0] + fullName.split(' ')[1].split('')[0]

    const onClick = () => {
        localStorage.removeItem('token');
        setLogined(false);
    }

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
                            <li className='drop_down__li'>
                                Settings
                            </li>
                        </Link>
                        <li className='drop_down__li logout' onClick={() => onClick()}>
                            Log Out
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}