import ProductItem from './ProductItem';
import { useSelector } from 'react-redux';
import '../assets/styles/UserPage.css';
import { useNavigate } from 'react-router-dom';


export default function Favourite() {
    const product = {
        id: 1933, 
        title: "American Posh Baby Short Sleeve Onesie", 
        price: 499, 
        picture: "http://ecx.images-amazon.com/images/I/41jog0WawgL._SX342_.jpg"
    }

    const { data } = useSelector(state => state.auth.user);

    const { fullName } = data;

    const initials = fullName.split(' ')[0].split('')[0] + fullName.split(' ')[1].split('')[0];

    const navigate = useNavigate();

    return (
        <div className="user_page">
            <div className="user_page__image">
                {initials}
            </div>
            <h3>{fullName}</h3>
            <div className="user_page__nav">
                <button 
                    className='user_page__nav_button'
                    onClick={() => navigate('/account')}
                >
                    Edit Account
                </button>
                <button 
                    className='user_page__nav_button'
                    onClick={() => navigate('/account/order_history')}
                >
                    Orders History
                </button>
                <button 
                    className='user_page__nav_button active'
                    onClick={() => navigate('/account/favourite')}
                >
                    Favourites
                </button>
            </div>
            <div className='list__items'>
                <ProductItem product={product}/>
                <ProductItem product={product}/>
                <ProductItem product={product}/>
                <ProductItem product={product}/>  
            </div>
        </div>
    )
}