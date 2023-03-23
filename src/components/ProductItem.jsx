import '../assets/styles/ProductItem.css';
import { useSelector, useDispatch } from 'react-redux';

import { deleteFavorite, postFavorite } from '../services/api/favorites';
import { addToFavorite, removeFromFavorite } from '../services/favoriteSlice';
import { useEffect } from 'react';

export default function ProductItem (props) {
    const {product} = props;
    const {setClickedProductId} = props;
    const {setOpenProductModal} = props;
    const {favoriteAdded, setFavoriteAdded} = props;

    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { favoriteItems } = useSelector(state => state.favoriteReducer);
    const findedItem = favoriteItems.find(value => value.id === product.id)

    const handleProductModal = () => {
        setClickedProductId(product.id);
        setOpenProductModal(true);
    }

    const addFavorite = (id) => {
        postFavorite(id);
        dispatch(addToFavorite(product));
    }

    const removeFavorite = (id) => {
        deleteFavorite(id);
        dispatch(removeFromFavorite(product));
    }

    const postFavouriteItem = (e, id = product.id) => {
        e.stopPropagation();
        findedItem
        ? removeFavorite(id)
        : addFavorite(id)
    }

    return (
        <div className="item__block" id={product.id}  onClick={() => handleProductModal()}>
            <img className="item__block__image" src={product.picture} alt=" "/>
            <p className="item__block__name">{product.title.split(' ').slice(0,4).join(' ')}</p>
            <p className="item__block__price">${product.price}</p>
            <button 
                type="button" 
                className={`item__block__button ${findedItem && 'favourite'}`} 
                onClick={(e) => postFavouriteItem(e, product.id)}
            />
        </div>
    )
}