import dropDown from '../../assets/images/drop_down.svg';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import '../../assets/styles/LoginedUI.css'

export default function LoginedUi( {setLogined} ) {
    const [open, setOpen] = useState(false);
    const variants = {
        rotate: { rotate: 0 , transition: { duration:0.5 } },
        stop: { rotate: 180 , transition: { duration: 0.5 } }
    }

    const onClick = () => {
        localStorage.removeItem('token');
        setLogined(false);
    }

    return (
        <div className='user__ui'>
            <p className='user__name'>
                Welcome, {'fullName'}
            </p>
            <div className='user__icon'>
                OK
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
                        initial={{opacity:0, y:-60}}
                        animate={{opacity:1, y:0, transition:{duration:0.5}}}
                        exit={{opacity:0, y:-10}}
                    >
                        <li className='drop_down__li'>
                            <p>
                                {'fullName'}
                            </p>
                            <p>
                                {'email'}
                            </p>
                        </li>
                        <hr className='drop_down__hr' />
                        <li className='drop_down__li'>
                            Settings
                        </li>
                        <li className='drop_down__li logout' onClick={() => onClick()}>
                            Log Out
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}