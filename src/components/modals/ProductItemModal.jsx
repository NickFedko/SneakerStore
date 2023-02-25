import '../../assets/styles/Modal.css';
import { useState, useEffect } from 'react';
import closeIcon from "../../assets/images/icons/close.svg";
import { getSingleProduct } from '../../services/api/products';
import { motion } from 'framer-motion';

export default function ProductItemModal( {clickedProductId, setOpenProductModal} ) {
    const [productContent, setProductContent] = useState([]);
    const {title, picture, price, description} = productContent;

    useEffect(() => {
        getSingleProduct(clickedProductId).then((response) => {
            setProductContent(response.data)
        })
    },[clickedProductId])

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
                <div className='modal__coontainer__product__info'>
                    <img src={picture} alt='product_img' />
                    <div className='modal__container__product__description'>
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <p className='price__label'>Price: <span>${price}</span></p>
                        <div className='modal__container__product__description__row'>
                            <button>+</button><p>1</p><button>-</button>
                        </div>
                        <p>Total price: <span>${price}</span></p>
                    </div>
                </div>
                <div className='modal__container__product__action'>
                    <button>add to cart</button>
                    <button>add to favorites</button>
                    <button className='button__buy_now'>buy now</button>
                </div>
            </motion.div>
        </motion.div>
    )
}