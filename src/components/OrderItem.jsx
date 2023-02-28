export default function OrderItem() {
    const product = {
        id: 1933, 
        title: "American Posh Baby Short Sleeve Onesie", 
        price: 499, 
        picture: "http://ecx.images-amazon.com/images/I/41jog0WawgL._SX342_.jpg"
    }
    
    return (
        <div className="orders__item__container">
            <img alt='order_item' src={product.picture}/>
            <div className="orders__item__container__info">
                <p>{product.title}</p>
                <p>Items: <span>1</span></p>
            </div>
            <div className="orders__item__container__info__price">
                <p>Price:</p>
                <p>${product.price}</p>
            </div>
        </div>
    )
}