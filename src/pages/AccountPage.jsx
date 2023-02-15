import {useEffect, useState} from 'react';
import '../assets/styles/UserPage.css'
import { useFormik } from 'formik';
import {  useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { ClipLoader } from 'react-spinners';
import { accountUpdate } from '../store/actions/account_update';

export default function AccountPage() {
    const [loading, setLoading] = useState(false);
    const [accountInfo, setAccountInfo] = useState({}) // use this

    useEffect(() => {
        // get account info from API
    }, [])

    //TODO API RESPONSE MESSAGE
    //const {message} = useSelector(state => state.message);
    // const dispatch = useDispatch();

    const { data } = useSelector(state => state.auth.user)  ;

    const { fullName, email, phone, country, city, address } = data;    

    const initials = fullName.split(' ')[0].split('')[0] + fullName.split(' ')[1].split('')[0];

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

    const dispatch = useDispatch();

    const handleClickUpdateAccountInfo = () => {
        setLoading(true);
        dispatch(accountUpdate(formik.values))
            .then((response) => console.log(response))
            .finally(() => setLoading(false))  
    }

    const formik = useFormik({
        initialValues: {
            fullName,
            email,
            phone,
            country: country || '',
            city: city || '',
            address: address || ''
        },
        validationSchema,
        onSubmit: handleClickUpdateAccountInfo
    });

    // const validationSchemaPassword = Yup.object().shape({
    //     oldPassword: Yup.string()
    //     .required("Current Password is required")
    //     .min(8, "Password must be at least 8 characters")
    //     .max(36, "Password must not exceed 36 characters")
    //     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,36}$/,
    //     'Must contain one uppercase character, one lowercase and one special symbol'),
    //     newPassword: Yup.string()
    //     .required("New Password is required")
    //     .min(8, "Password must be at least 8 characters")
    //     .max(36, "Password must not exceed 36 characters")
    //     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,36}$/,
    //     'Must contain one uppercase character, one lowercase and one special symbol'),
    //     newPasswordRepeat: Yup.string()
    //     .required("Confirm Password is required")
    //     .min(8, "Password must be at least 8 characters")
    //     .max(36, "Password must not exceed 36 characters")
    //     .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    // })

    // const formikPassword = useFormik({
    //     initialValues: {
    //         oldPassword: '',
    //         newPassword: '',
    //         newPasswordRepeat: ''
    //     },
    //     validationSchema:validationSchemaPassword,
    //     onSubmit: (data) => {
    //         return(JSON.stringify(data, null, 2));
    //     }
    // })



    return(
        <div className="user_page">
            <div className="user_page__image">
                {initials}
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
                    onClick={() => formik.handleSubmit()}
                >{loading ? <ClipLoader color={'white'} size={20}/> : 'Save'}</button>
            </div>
            {/*<section id='profile-password-section'>*/}
            {/*    <p className="user_page__password_change">Change Password</p>*/}
            {/*    <div className="user_page__password_change__form" >*/}
            {/*    <div className="password_change__form__input_block">*/}
            {/*        <input */}
            {/*            type="password"*/}
            {/*            className="input_block__input"*/}
            {/*            placeholder=' '*/}
            {/*            name='oldPassword'*/}
            {/*            value={formikPassword.values.oldPassword}*/}
            {/*            onChange={formikPassword.handleChange}*/}
            {/*        />*/}
            {/*        <span>Current password</span>*/}
            {/*        <label>{formikPassword.errors.oldPassword && formikPassword.touched.oldPassword? formikPassword.errors.oldPassword : null}</label>*/}
            {/*    </div>*/}
            {/*    <div className="password_change__form__input_block">*/}
            {/*        <input */}
            {/*            type="password"*/}
            {/*            className="input_block__input" */}
            {/*            placeholder=' '*/}
            {/*            name='newPassword'*/}
            {/*            value={formikPassword.values.newPassword}*/}
            {/*            onChange={formikPassword.handleChange}*/}
            {/*        />*/}
            {/*        <span>New Password</span>*/}
            {/*        <label>{formikPassword.errors.newPassword && formikPassword.touched.newPassword? formikPassword.errors.newPassword : null}</label>*/}
            {/*    </div>*/}
            {/*    <div className="password_change__form__input_block">*/}
            {/*        <input */}
            {/*            type="password"*/}
            {/*            className="input_block__input" */}
            {/*            placeholder=' '*/}
            {/*            name='newPasswordRepeat'*/}
            {/*            value={formikPassword.values.newPasswordRepeat}*/}
            {/*            onChange={formikPassword.handleChange} */}
            {/*        />*/}
            {/*        <span>Confirm password</span>*/}
            {/*        <label>{formikPassword.errors.newPasswordRepeat && formikPassword.touched.newPasswordRepeat? formikPassword.errors.newPasswordRepeat : null}</label>*/}
            {/*    </div>*/}
            {/*    <button */}
            {/*        type="button"*/}
            {/*        onClick={() => changePasswordHandleSubmit(formikPassword.values.oldPassword, formikPassword.values.newPassword)}*/}
            {/*    >{loadingPassword ? <ClipLoader color={'white'} size={20}/> : 'Change'}</button>*/}
            {/*</div>*/}
            {/*</section>*/}
        </div>
    )
}