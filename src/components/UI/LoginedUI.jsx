import dropDown from '../../assets/images/drop_down.svg';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginedUi() {
    const [open, setOpen] = useState(false);

    retrun (
        <div>
            <p>
                Welcome, {fullName}
            </p>
            <img alt={fullName}/>
            <img 
                src={dropDown}
                onClick={() => setOpen(!open)}
            />
            {open && (
                <ul 
                    className='drop_down__ul'
                >
                    <li className='drop_down__li'>
                        <p>
                            {fullName}
                        </p>
                        <p>
                            {email}
                        </p>
                    </li>
                    <li className='drop_down__li'>
                        Settings
                    </li>
                    <li className='drop_down__li'>
                        Log Out
                    </li>
                </ul>
            )}
        </div>
    )
}