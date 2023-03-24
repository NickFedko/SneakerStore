export default function OrderItem( {orderedProduct} ) {    
    return (
        <div className="orders__item__container">
            <img alt='order_item' src={orderedProduct.product.picture}/>
            <div className="orders__item__container__info">
                <p>{orderedProduct.product.title}</p>
                <p>Items: <span>{orderedProduct.quantity}</span></p>
            </div>
            <div className="orders__item__container__info__price">
                <p>Price:</p>
                <p>${orderedProduct.orderedPrice}</p>
            </div>
        </div>
    )
}