import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import close from '../../assets/images/close.svg';
import '../../assets/styles/ModalLogin.css';
import postLogin from "../../services/api/login";

import { login } from '../../actions/auth'

import { ClipLoader } from 'react-spinners';

import * as Yup from 'yup'

export default function Login({setOpenLoginModal}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoggedIn} = useSelector(state => state.auth)
    const {message} = useSelector(state => state.message)

    const signIn = (email, password) => {
        setLoading(true);
        formik.handleSubmit() ? 
            setLoading(false)
            : 
            dispatch(login(email, password))
                .then(() => {
                    navigate('/account')
                    setLoading(false)
                    setOpenLoginModal(false)
                })
                .catch(() => {
                    setLoading(false);
                })
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .max(36, "Password must not exceed 36 characters")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,36}$/,
          'Must contain one uppercase character, one lowercase and one special symbol'
          )
      });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (data) => {
            return(JSON.stringify(data, null, 2));
        },
    });

    return(
        <>
            {message && (<span>{message}</span>)}
            <button 
                className="modal__close-button" 
                onClick={() => setOpenLoginModal(false)}
            >
                <img src={close} />
            </button>
            <h2>Login</h2>
            <div className='input__container'>
                <input 
                    type="email" 
                    name="email"
                    placeholder=' '
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                <span>Email</span>
                <label>
                    {formik.errors.email && formik.touched.email ? formik.errors.email : null}
              </label>
            </div>
            <div className='input__container'>
                <input 
                    type={passwordShown ? 'text' : 'password'} 
                    name="password" 
                    placeholder=' '
                    required 
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <span>Password</span>
                <label>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</label>
                <button 
                    type="button"
                    className='input__container__password__button'
                    onClick={togglePassword}
                />
            </div>
            <button
                type="button"
                onClick={()=> signIn(formik.values.email, formik.values.password)}
            >
                {loading ? <ClipLoader color={'white'} size={20}/> : 'Login'}
            </button>
        </>
    )
}