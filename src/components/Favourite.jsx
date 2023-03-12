import ProductItem from './ProductItem';
import { useSelector } from 'react-redux';
import '../assets/styles/UserPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFavorites } from '../services/api/favorites';


export default function Favourite() {
    const [favoritesProducts, setFavoritesProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        getFavorites({offset, limit})
            .then(res => setFavoritesProducts(res.data))
    }, [limit, offset])

    const { user } = useSelector(state => state.auth);

    const { fullName } = user;

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
                { favoritesProducts.map((product, index) => (
                    <ProductItem product={product} key={index}/> 
                ))}
            </div>
        </div>
    )
}