import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/actions/auth'
import { ClipLoader } from 'react-spinners';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup'

export default function LoginForm({setOpenLoginModal}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const notify = (message, type) => toast(message, {
        type,
        autoClose: 1000,
        theme: 'colored'
    })

    const {message} = useSelector(state => state.message)
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
            password: '',
        },
        validationSchema,
        onSubmit: signIn
    });

    function signIn() {
        setLoading(true);
        dispatch(login(formik.values))
            .then(() => {
                notify('You are loggined', 'success')
                navigate('/account');
                setLoading(false);
                setOpenLoginModal(false);
            })
            .catch(() => notify(message, 'error'))
            .finally(() => {
                setLoading(false);
        })
    }


    return(
        <>
            <h2>Login</h2>
            <div className='input__container'>
                <input 
                    type="email" 
                    name="email"
                    placeholder=' '
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={formik.errors.email && formik.touched.email ? 'error' : ''}
                />
                <span className={formik.errors.email && formik.touched.email ? 'error' : ''}>Email</span>
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
                    className={formik.errors.password && formik.touched.password ? 'error' : ''}
                />
                <span className={formik.errors.password && formik.touched.password ? 'error' : ''}>Password</span>
                <label>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</label>
                <button 
                    type="button"
                    className='input__container__password__button'
                    onClick={togglePassword}
                />
            </div>
            <button type="button" onClick={()=> formik.handleSubmit()}>
                {loading ? <ClipLoader color={'white'} size={20}/> : 'Login'}
            </button>
        </>
    )
}