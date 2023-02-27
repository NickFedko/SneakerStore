import { ClipLoader } from 'react-spinners';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { register } from '../../store/actions/auth';

export default function RegisterForm({setOpenRegisterModal}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    const notify = () => toast('You are registered!', {
        type: 'success',
        autoClose: 1000,
        theme: 'colored'
    })

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .max(36, "Password must not exceed 36 characters")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,36}$/,
          'Must contain one uppercase character, one lowercase and one special symbol'
          ),
        fullName: Yup.string()
        .required("Full Name required")
        .min(3, "At least 3 Character")
        .matches(/^[a-zA-Z\s]+$/, 'Only letters. Cannot have special characters and numbers'),
        phone: Yup.string()
        .required("Phone number required")
        .min(10, "At least 10 numbers")
        .matches(/^(\+)?([0-9]){10,14}$/, 'Should contain 10-14 numbers, can have optional + at the beginning')
      });
    const dispatch = useDispatch();
  
    const {message} = useSelector(state => state.message)

      
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            fullName: '',
            phone: ''
        },
        validationSchema,
        onSubmit: signUp
    });


    function signUp() {
        setLoading(true);
        dispatch(register(formik.values))
            .then(() => {
                setLoading(false);
                setOpenRegisterModal(false);
                notify();
            })
            .catch(() => {
                setLoading(false);
            })
    }
        

    return(
        <>
            {message && (<span>{message}</span>)}
            <h2>Register</h2>
            <div className='input__container'>
                <input 
                    type="text" 
                    name="fullName"
                    placeholder=' '
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    className={formik.errors.fullName && formik.touched.fullName ? 'error' : ''}
                    required 
                />
                <span className={formik.errors.fullName && formik.touched.fullName ? 'error' : ''}>Full Name</span>
                <label>{formik.errors.fullName && formik.touched.fullName ? formik.errors.fullName : null}</label>
            </div>
            <div className='input__container'>
                <input 
                    type="email" 
                    name="email" 
                    placeholder=' '
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={formik.errors.email && formik.touched.email ? 'error' : ''}
                    required 
                />
                <span className={formik.errors.email && formik.touched.email ? 'error' : ''}>Email</span>
                <label>{formik.errors.email && formik.touched.email ? formik.errors.email : null}</label>
            </div>
            <div className='input__container'>
                <input 
                    type="tel" 
                    name="phone"
                    placeholder=' '
                    value={formik.values.phone}
                    onChange={formik.handleChange} 
                    required 
                    className={formik.errors.phone && formik.touched.phone ? 'error' : ''}
                />
                <span className={formik.errors.phone && formik.touched.phone ? 'error' : ''}>Phone</span>
                <label>{formik.errors.phone && formik.touched.phone ? formik.errors.phone : null}</label>
            </div>
            <div className='input__container'>
                <input 
                    type={passwordShown ? 'text' : 'password'} 
                    name="password"
                    placeholder=' '
                    value={formik.values.password}
                    onChange={formik.handleChange} 
                    required 
                    className={formik.errors.password && formik.touched.password ? 'error' : ''}
                />
                <span className={formik.errors.password && formik.touched.password ? 'error' : ''}>Password</span>
                <label>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</label>
                <button 
                    className='input__container__password__button'
                    onClick={togglePassword}
                />
            </div>
            <button 
                type="button"
                onClick={() => formik.handleSubmit()}
            >
                {loading ? <ClipLoader color={'white'} size={20}/> : 'Register'}
            </button>
        </>
    )
}