import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getCountries from "../../services/api/countries";
import PurchaseModal from "../modals/PurchaseModal";
import { AnimatePresence } from "framer-motion";

export default function CartForm() {
    const [selectCounties, setSelectCountries] = useState([]);
    const [openPurchaseModal, setOpenPurchaseModal] = useState(false);

    useEffect(() => {
        getCountries()
            .then((response) => setSelectCountries(response.data))
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
                    {selectCounties.map((country, index) => (
                        <option key={index}>{country}</option>
                    ))}
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
            <button
                type="button"
                onClick={() => setOpenPurchaseModal(true)}
            >
                Confirms the purchase
            </button>
            <Link to={'/'}>
                <button type="button">Continue shopping</button>
            </Link>
            {openPurchaseModal &&
                <AnimatePresence>
                    <PurchaseModal key={'PurchaseModal'} setOpenPurchaseModal={setOpenPurchaseModal} />
                </AnimatePresence>
            }
        </form>
    )
}
