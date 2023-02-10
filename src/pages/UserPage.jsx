import { useState } from 'react';
import '../assets/styles/UserPage.css'
import { useFormik } from 'formik';
import {  useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { ClipLoader } from 'react-spinners';

import putUserAccountInfo from '../services/user-service'
import putUserAccountPassword from '../services/user-service'

export default function UserPage() {
    const [loading, setLoading] = useState(false);
    const [loadingPassword, setLoadingPassword] =  useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const fullName = user.account.fullName;
    const email = user.account.email;
    const phone = user.account.phone;
    const country = user.account.country;
    const city = user.account.city;
    const address = user.account.address;
    const firstLettersOfFullname = fullName.split(' ')[0].split('')[0] + fullName.split(' ')[1].split('')[0];

    //TODO API RESPONSE MESSAGE
    //const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        fullName: Yup.string()
        .required("Full Name required")
        .min(3, "At least 3 character")
        .matches(/^[a-zA-Z\s]+$/, 'Only letters. Cannot have special characters and numbers'),
        phone: Yup.string()
        .required("Phone number required")
        .min(10, "At least 10 numbers")
        .matches(/^(\+)?([0-9]){10,14}$/, 'Should contain 10-14 numbers, can have optional + at the beginning'),
        country: Yup.string()
        .required("Country required")
        .min(4, "At least 4 character"),
        city: Yup.string()
        .required("City required")
        .min(3, "At least 3 character"),
        address: Yup.string()
        .required('Addres required')
        .min(3, "At least 3 character"),
      });
    
    const validationSchemaPassword = Yup.object().shape({
        oldPassword: Yup.string()
        .required("Current Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(36, "Password must not exceed 36 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,36}$/,
        'Must contain one uppercase character, one lowercase and one special symbol'),
        newPassword: Yup.string()
        .required("New Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(36, "Password must not exceed 36 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,36}$/,
        'Must contain one uppercase character, one lowercase and one special symbol'),
        newPasswordRepeat: Yup.string()
        .required("Confirm Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(36, "Password must not exceed 36 characters")
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    })

    const formikPassword = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: ''
        },
        validationSchema:validationSchemaPassword,
        onSubmit: (data) => {
            return(JSON.stringify(data, null, 2));
        }
    })

      const formik = useFormik({
        initialValues: {
            email: `${email}`,
            fullName: `${fullName}`,
            phone: `${phone}`,
            country: `${country ? country : ''}`,
            city: `${city ? city : ''}`,
            address: `${address ? address : ''}`
        },
        validationSchema,
        onSubmit: (data) => {
            return(JSON.stringify(data, null, 2));
        },
    });

    const infoHandleSubmit = (fullName, email, phone, country, city, address) => {
        setLoading(true);
        formik.handleSubmit() 
            ? 
            setLoading(false)
            : 
            dispatch(putUserAccountInfo(fullName, email, phone, country, city, address))
                .then(() => {
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false);
                })
    }

    const changePasswordHandleSubmit = (oldPassword, newPassword) => {
        setLoadingPassword(true);
        formikPassword.handleSubmit()
            ?
            setLoadingPassword(false)
            :
            dispatch(putUserAccountPassword(oldPassword, newPassword))
                .then(() => {
                    setLoadingPassword(false)
                })
                .catch(() => {
                    setLoadingPassword(false);
                })
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
            <div className="user_page__info__form" >
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        placeholder=' '
                        name='fullName'
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                    />
                    <span>Full Name</span>
                    <label>{formik.errors.fullName && formik.touched.fullName? formik.errors.fullName : null}</label>
                </div>
                <div className="info__form__input_block">
                    <input
                        type="email" 
                        className="input_block__input"
                        placeholder=' '
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <span>Email</span>
                    <label>{formik.errors.email && formik.touched.email? formik.errors.email : null}</label>
                </div>
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        placeholder=' '
                        name='phone'
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                    <span>Phone</span>
                    <label>{formik.errors.phone && formik.touched.phone? formik.errors.phone : null}</label>
                </div>
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        placeholder=' '
                        name='country'
                        onChange={formik.handleChange}
                        value={formik.values.country}
                    />
                    <span>Country</span>
                    <label>{formik.errors.country && formik.touched.country? formik.errors.country : null}</label>
                </div>
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        placeholder=' '
                        name='city'
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    />
                    <span>City</span>
                    <label>{formik.errors.city && formik.touched.city? formik.errors.city : null}</label>
                </div>
                <div className="info__form__input_block">
                    <input 
                        className="input_block__input" 
                        placeholder=' '
                        name='address'
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                    <span>Address</span>
                    <label>{formik.errors.address && formik.touched.address? formik.errors.address : null}</label>
                </div>
                <button 
                    type="button" 
                    onClick={() => infoHandleSubmit(formik.values.fullName, formik.values.email, formik.values.phone, formik.values.country, formik.values.city, formik.values.address)}
                >{loading ? <ClipLoader color={'white'} size={20}/> : 'Save'}</button>
            </div>
            <p className="user_page__password_change">Change Password</p>
            <div className="user_page__password_change__form" >
                <div className="password_change__form__input_block">
                    <input 
                        type="password"
                        className="input_block__input"
                        placeholder=' '
                        name='oldPassword'
                        value={formikPassword.values.oldPassword}
                        onChange={formikPassword.handleChange}
                    />
                    <span>Current password</span>
                    <label>{formikPassword.errors.oldPassword && formikPassword.touched.oldPassword? formikPassword.errors.oldPassword : null}</label>
                </div>
                <div className="password_change__form__input_block">
                    <input 
                        type="password"
                        className="input_block__input" 
                        placeholder=' '
                        name='newPassword'
                        value={formikPassword.values.newPassword}
                        onChange={formikPassword.handleChange}
                    />
                    <span>New Password</span>
                    <label>{formikPassword.errors.newPassword && formikPassword.touched.newPassword? formikPassword.errors.newPassword : null}</label>
                </div>
                <div className="password_change__form__input_block">
                    <input 
                        type="password"
                        className="input_block__input" 
                        placeholder=' '
                        name='newPasswordRepeat'
                        value={formikPassword.values.newPasswordRepeat}
                        onChange={formikPassword.handleChange} 
                    />
                    <span>Confirm password</span>
                    <label>{formikPassword.errors.newPasswordRepeat && formikPassword.touched.newPasswordRepeat? formikPassword.errors.newPasswordRepeat : null}</label>
                </div>
                <button 
                    type="button"
                    onClick={() => changePasswordHandleSubmit(formikPassword.values.oldPassword, formikPassword.values.newPassword)}
                >{loadingPassword ? <ClipLoader color={'white'} size={20}/> : 'Change'}</button>
            </div>
        </div>
    )
}