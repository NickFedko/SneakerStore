import { useState } from 'react';
import '../assets/styles/UserPage.css'

import axios from 'axios';

export default function UserPage() {
    const data = JSON.parse(localStorage.getItem('data'));
    const token = localStorage.getItem('token');

    const fullName = data.fullName;
    const email = data.email;
    const phone = data.phone;
    const country = data.country;
    const city = data.city;
    const address = data.address;
    const firstLettersOfFullname = fullName.split(' ')[0].split('')[0] + fullName.split(' ')[1].split('')[0];

    const [name,setName] = useState(`${fullName}`);
    const [mail,setMail] = useState(`${email}`);
    const [number,setNumber] = useState(`${phone}`);
    const [nation,setNation] = useState(`${country ? country : ''}`)
    const [town,setTown] = useState(`${city ? city : ''}`);
    const [direction,setDirection]= useState(`${address ? address : ''}`);

    const [oldAccountPassword, setOldAccountPassword] = useState('');
    const [newAccountPassword, setNewAccountPassword] = useState('');
    const [repeatAccountPassword, setRepeatAccountPassword] = useState('');

    // const acc_info = JSON.parse(localStorage.getItem('acc_info'))
    // console.log(acc_info)


    let info = {
        fullName: name,
        email: mail,
        phone: number,
        country: nation,
        city: town,
        address: direction
    }

    let password = {
        oldPassword: oldAccountPassword,
        password: newAccountPassword
    }

    const infoHandleSubmit = (e, item) => {
        e.preventDefault();
        putDataInfo(item);
    }

    const changePasswordHandleSubmit = (e, item) => {
        e.preventDefault();
        putDataPassword(item);
    }

    async function putDataInfo(item) {
        let result = await axios({
            method: 'PUT',
            url: "https://demo-api.apiko.academy/api/account",
            data: info,
            headers: {
                "Content-type": "application/json",
                "accept": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        console.log(result)
    }

    async function putDataPassword(item) {
        let result = await axios({
            method: 'PUT',
            url: "https://demo-api.apiko.academy/api/account/password",
            data: item,
            headers: {
                "Content-type": "application/json",
                "accept": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });
        console.log(result);
    }

    return(
        <div className="user_page">
            <div className="user_page__image">
                {firstLettersOfFullname}
            </div>
            <div className="user_page__nav">
                <button className='user_page__nav_button'>Edit Account</button>
                <button className='user_page__nav_button'>Orders History</button>
                <button className='user_page__nav_button'>Favourites</button>
            </div>
            <p className="user_page__info">Main information</p>
            <form className="user_page__info__form" onSubmit={(e) => infoHandleSubmit(e, info)}>
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        required 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <span>Full Name</span>
                </div>
                <div className="info__form__input_block">
                    <input
                        type="email" 
                        className="input_block__input" 
                        required 
                        onChange={(e) => setMail(e.target.value)}
                        value={mail}
                    />
                    <span>Email</span>
                </div>
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        required 
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                    />
                    <span>Phone</span>
                </div>
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        required
                        onChange={(e) => setNation(e.target.value)}
                        value={nation}
                    />
                    <span>Country</span>
                </div>
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        required
                        onChange={(e) => setTown(e.target.value)}
                        value={town}
                    />
                    <span>City</span>
                </div>
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        required
                        onChange={(e) => setDirection(e.target.value)}
                        value={direction}
                    />
                    <span>Address</span>
                </div>
                <button type="submit" >Save</button>
            </form>
            <p className="user_page__password_change">Change Password</p>
            <form className="user_page__password_change__form" onSubmit={(e) => changePasswordHandleSubmit(e, password)}>
                <div className="password_change__form__input_block">
                    <input 
                        type="password"
                        className="input_block__input"
                        required
                        onChange={(e) => setOldAccountPassword(e.target.value)}
                    />
                    <span>Current password</span>
                </div>
                <div className="password_change__form__input_block">
                    <input 
                        type="password"
                        className="input_block__input" 
                        required
                        onChange={(e) => setNewAccountPassword(e.target.value)}
                    />
                    <span>New Password</span>
                </div>
                <div className="password_change__form__input_block">
                    <input 
                        type="password"
                        className="input_block__input" 
                        required
                        onChange={(e) => setRepeatAccountPassword(e.target.value)}
                    />
                    <span>Confirm password</span>
                </div>
                <button type="submit">Change password</button>
            </form>
        </div>
    )
}