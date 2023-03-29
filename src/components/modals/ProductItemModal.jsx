import '../../assets/styles/Modal.css';
import { useState, useEffect } from 'react';
import closeIcon from "../../assets/images/icons/close.svg";
import { getSingleProduct } from '../../services/api/products';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { postFavorite, deleteFavorite } from '../../services/api/favorites';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../services/cartSlice';
import { addToFavorite, removeFromFavorite } from '../../services/favoriteSlice';


export default function ProductItemModal( {clickedProductId, setOpenProductModal} ) {
    const [productContent, setProductContent] = useState([]);
    const [productAmount, setProductAmount] = useState(1);
    const {title, picture, price, description} = productContent;
    const [contentLoading, setContentLoading] = useState(false);
    const { cartItems } = useSelector(state => state.cartReducer);
    const { favoriteItems } = useSelector(state => state.favoriteReducer);
    const { isLoggedIn } = useSelector(state => state.auth);
    const findedItemInCart = cartItems.find(value => value.id === productContent.id)
    const findedItemInFavorite = favoriteItems.find(value => value.id === productContent.id)


    const dispatch = useDispatch();

    const objProductAmount = { amount: productAmount }

    const handleAddRemoveCart = (product) => {
        Object.assign(product, objProductAmount);
        findedItemInCart  
        ? dispatch(removeFromCart(product))
        : dispatch(addToCart(product))
    }

    const increase = () => {
        setProductAmount(productAmount + 1);
    }

    const decrease = () => {
        if(productAmount > 1) {
            setProductAmount(productAmount - 1);
        }
    }

    useEffect(() => {
        setContentLoading(true);
        getSingleProduct(clickedProductId)
        .then((response) => {
            setProductContent(response.data)
        })
        .finally(() => setContentLoading(false))
    },[clickedProductId])


    const addFavorite = (id) => {
        postFavorite(id);
        dispatch(addToFavorite(productContent));
    }

    const removeFavorite = (id) => {
        deleteFavorite(id);
        dispatch(removeFromFavorite(productContent));
    }

    const postFavouriteItem = (e, id = productContent.id) => {
        e.stopPropagation();
        if(isLoggedIn) {
            findedItemInFavorite 
            ? removeFavorite(id)
            : addFavorite(id)
        }
    }

    return(
        <motion.div 
            className="modal__overlay"
            initial={{opacity:0}}
            animate={{
                opacity:1,
                transition:{duration:0.5}
            }}
            exit={{opacity:0}}
        >
            <motion.div 
                className='modal__container'
                initial={{scale:0}}
                animate={{
                    scale:1,
                    transition: {duration:0.5}
                }}
                exit={{scale:0}}
            >
            <button 
                className="modal__close-button" 
                onClick={() => setOpenProductModal(false)}
            >
                <img src={closeIcon} alt={'close icon'}/>
            </button>
                {contentLoading 
                ? <ClipLoader size={200} color='black' />
                :<>
                    <div className='modal__container__product__info'>
                        <img src={picture} alt='product_img' />
                        <div className='modal__container__product__description'>
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <p className='price__label'>Price: <span>${price}</span></p>
                            <div className='modal__container__product__description__row'>
                                <button
                                    type='button'
                                    onClick={() => increase()}
                                >
                                    +
                                </button>
                                <p>{productAmount}</p>
                                <button
                                    type='button'
                                    className={productAmount > 1 ? '' : 'active'}
                                    onClick={() => decrease()}
                                >
                                    -
                                </button>
                            </div>
                            <p>Items: <span>{productAmount}</span></p>
                            <p>Total: <span>${price*productAmount}</span></p>
                        </div>
                    </div>
                    <div className='modal__container__product__action'>
                        <button 
                            onClick={() => handleAddRemoveCart(productContent)}
                            className='active'
                        >
                            {findedItemInCart ? 'added to cart  ✓' : 'add to cart'}
                        </button>
                        <button 
                            onClick={(e) => postFavouriteItem(e, productContent.id)}
                            className={isLoggedIn && 'active'}
                        >
                            {findedItemInFavorite ? 'added to favorites ✓' : 'add to favorite'}
                        </button>
                        <button className='button__buy_now'>buy now</button>
                    </div>
                </>}
            </motion.div>
        </motion.div>
    )
}