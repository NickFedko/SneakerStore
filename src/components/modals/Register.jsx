import close from '../../assets/images/close.svg';
import '../../assets/styles/ModalRegister.css';

import postRegister from '../../services/api/register';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register({setOpenRegisterModal}) {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

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

      const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            fullName: '',
            phone: ''
        },
        validationSchema,
        onSubmit: (data) => {
            return(JSON.stringify(data, null, 2));
        },
    });

    useEffect(()=> {
        postRegister(formik.values.email, formik.values.password, formik.values.phone, formik.values.fullName)
        .then((response) =>{
            console.log(response);
        }).catch(error => console.log(error))
            .finally(() => {
            console.log('Expirement completed')
         })
    }, [])

    const onClick = () => {
        formik.handleSubmit() ? setOpenRegisterModal(false) : console.log('check')
    }
    return(
        <>
            <button 
                className="modal__close-button" 
                onClick={() => setOpenRegisterModal(false)}
            >
                <img src={close} />
            </button>
            <h2>Register</h2>
            <div className='input__container'>
                <input 
                    type="text" 
                    name="fullName"
                    placeholder=' '
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    required 
                />
                <span className="label__span">Full Name</span>
                <label>{formik.errors.fullName && formik.touched.fullName ? formik.errors.fullName : null}</label>
            </div>
            <div className='input__container'>
                <input 
                    type="email" 
                    name="email" 
                    placeholder=' '
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required 
                />
                <span>Email</span>
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
                />
                <span>Phone</span>
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
                />
                <span>Password</span>
                <label>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</label>
                <button 
                    className='input__container__password__button'
                    onClick={togglePassword}
                />
            </div>
            <button 
                type="button"
                onClick={onClick}
            >
                Register
            </button>
        </>
    )
}