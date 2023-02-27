import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getCountries from "../../services/api/countries";

export default function CartForm() {
    const [selectCounties, setSelectCountries] = useState([]);

    useEffect(() => {
        getCountries().then(res => console.log(res))
    }, [])

    return(
        <form className="cart__form">
            <div className="input__block">
                <input placeholder=" "/>
                <span>Full Name</span>
            </div>
            <div className="input__block">
                <input placeholder=" "/>
                <span>Phone</span>
            </div>
            <div className="select__block">
                <select>
                    <option>Ukraine</option>
                </select>
                <span>Country</span>
            </div>
            <div className="input__block">
                <input placeholder=" "/>
                <span>City</span>
            </div>
            <div className="input__block">
                <input placeholder=" "/>
                <span>Address</span>
            </div>
            <p>Items <span>3</span></p>
            <p>Total <span>$ 575.19</span></p>
            <button type="button">Confirms the purchase</button>
            <Link to={'/'}>
                <button type="button">Continue shopping</button>
            </Link>
        </form>
    )
}