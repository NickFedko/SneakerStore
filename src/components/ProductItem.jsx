import '../assets/styles/ProductItem.css';
import { useSelector } from 'react-redux';

import { deleteFavorite, postFavorite } from '../services/api/favorites';
import { useEffect } from 'react';

export default function ProductItem (props) {
    const {product} = props;
    const {setClickedProductId} = props;
    const {setOpenProductModal} = props;
    const {favoriteAdded, setFavoriteAdded} = props;

    const { isLoggedIn } = useSelector(state => state.auth)

    const handleClick = () => {
        setClickedProductId(product.id);
        setOpenProductModal(true);
    }

    const postFavouriteItem = (e, id = product.id) => {
        e.stopPropagation();
        setFavoriteAdded(!favoriteAdded);
        product.favorite 
        ? deleteFavorite(id)
        : postFavorite(id)
    }

    return (
        <div className="item__block" id={product.id}  onClick={() => handleClick()}>
            <img className="item__block__image" src={product.picture} alt=" "/>
            <p className="item__block__name">{product.title.split(' ').slice(0,4).join(' ')}</p>
            <p className="item__block__price">${product.price}</p>
            <button 
                type="button" 
                className={`item__block__button ${product.favorite && 'favourite'}`} 
                onClick={(e) => postFavouriteItem(e, product.id)}
            />
        </div>
    )
}