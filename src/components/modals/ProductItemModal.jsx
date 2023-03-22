import '../../assets/styles/Modal.css';
import { useState, useEffect } from 'react';
import closeIcon from "../../assets/images/icons/close.svg";
import { getSingleProduct } from '../../services/api/products';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { postFavorite, deleteFavorite } from '../../services/api/favorites';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../services/cartSlice';


export default function ProductItemModal( {clickedProductId, setOpenProductModal, favoriteAdded, setFavoriteAdded} ) {
    const [productContent, setProductContent] = useState([]);
    const {title, picture, price, description, favorite} = productContent;
    const [contentLoading, setContentLoading] = useState(false);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    useEffect(() => {
        setContentLoading(true);
        getSingleProduct(clickedProductId)
        .then((response) => {
            setProductContent(response.data)
        })
        .finally(() => setContentLoading(false))
    },[clickedProductId, productContent.favorite])

    const postFavouriteItem = (e, id = productContent.id) => {
        e.stopPropagation();
        setFavoriteAdded(!favoriteAdded);
        productContent.favorite 
        ? deleteFavorite(id)
        : postFavorite(id)
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
                                <button>+</button><p>1</p><button>-</button>
                            </div>
                            <p>Items: <span>1</span></p>
                            <p>Total: <span>${price}</span></p>
                        </div>
                    </div>
                    <div className='modal__container__product__action'>
                        <button onClick={() => handleAddToCart(productContent)}>
                            add to cart
                        </button>
                        <button onClick={(e) => postFavouriteItem(e, productContent.id)}>
                            {favorite ? 'remove from favorites' : 'add to favorite'}
                        </button>
                        <button className='button__buy_now'>buy now</button>
                    </div>
                </>}
            </motion.div>
        </motion.div>
    )
}