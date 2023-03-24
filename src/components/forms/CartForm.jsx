import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getCountries from "../../services/api/countries";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postOrder } from "../../services/api/orders";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { clearCart } from "../../services/cartSlice";


export default function CartForm({ setOpenPurchaseModal }) {
    const [selectCounties, setSelectCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { cartTotalQuantity, cartTotalAmount, cartItems } = useSelector(state => state.cartReducer);
    const { user } = useSelector(state => state.auth);

    const notify = (message) => toast(message, {
        type: 'default',
        autoClose: 2000,
        theme: 'colored'
    });

    const cartItemsIdAndQuantity = cartItems.map(value => { 
        return { productId: value.id , quantity: value.cartQuantity }
    })

    const { fullName, phone, country, city, address } = user;

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required("Full Name required")
            .min(3, "At least 3 character")
            .matches(/^[a-zA-Z\s]+$/, 'Only letters. Cannot have special characters and numbers'),
        phone: Yup.string()
            .required("Phone number required")
            .min(10, "At least 10 numbers")
            .matches(/^(\+)?([0-9]){10,14}$/, 'Should contain 10-14 numbers, can have optional + at the beginning'),
        country: Yup.string()
            .required("Country required"),
        city: Yup.string()
            .required("City required")
            .min(3, "At least 3 character"),
        address: Yup.string()
            .required('Addres required')
            .min(3, "At least 3 character"),
    });

    const confirmPurchase = () => {
        setLoading(true);
        setOpenPurchaseModal(true);
        dispatch(clearCart());
        postOrder(cartItemsIdAndQuantity, formik.values)
            .then(res => notify(`Create new order ID: ${res.data.id}`))
            .finally(() => setLoading(false))
    }

    const formik = useFormik({
        initialValues: {
            fullName: fullName || '',
            phone: phone || '',
            country: country || '',
            city: city || '',
            address: address || ''
        },
        validationSchema,
        onSubmit: confirmPurchase,
    });
    
    useEffect(() => {
        getCountries()
            .then((response) => setSelectCountries(response.data))
    }, [])

    return(
        <form className="cart__form">
            <div className="input__block">
                <input 
                    placeholder=" "
                    name='fullName'
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                />
                <span>Full Name</span>
                <label>{formik.errors.fullName && formik.touched.fullName? formik.errors.fullName : null}</label>
            </div>
            <div className="input__block">
                <input 
                    placeholder=" "
                    name='phone'
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
                <span>Phone</span>
                <label>{formik.errors.phone && formik.touched.phone? formik.errors.phone : null}</label>
            </div>
            <div className="select__block">
                <select 
                    name='country'
                    value={formik.values.country} 
                    onChange={formik.handleChange}
                >
                    {selectCounties.map((country, index) => (
                        <option key={index}>{country}</option>
                    ))}
                </select>
                <span>Country</span>
            </div>
            <div className="input__block">
                <input 
                    placeholder=" "
                    name='city'
                    onChange={formik.handleChange}
                    value={formik.values.city}
                />
                <span>City</span>
                <label>{formik.errors.city && formik.touched.city? formik.errors.city : null}</label>
            </div>
            <div className="input__block">
                <input 
                    placeholder=" "
                    name='address'
                    onChange={formik.handleChange}
                    value={formik.values.address}
                />
                <span>Address</span>
                <label>{formik.errors.address && formik.touched.address? formik.errors.address : null}</label>
            </div>
            <p>Items <span>{cartTotalQuantity}</span></p>
            <p>Total <span>$ {cartTotalAmount}</span></p>
            <button
                type="button"
                onClick={() => formik.handleSubmit()}
            >
                {loading ? <ClipLoader color={'white'} size={20}/> : 'Confirms the purchase'}
            </button>
            <Link to={'/'}>
                <button type="button">Continue shopping</button>
            </Link>
        </form>
    )
}
