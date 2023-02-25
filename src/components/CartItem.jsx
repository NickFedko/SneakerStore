export default function CartItem() {
    const product = {
        id: 1933, 
        title: "American Posh Baby Short Sleeve Onesie", 
        price: 499, 
        picture: "http://ecx.images-amazon.com/images/I/41jog0WawgL._SX342_.jpg"
    }

    return(
        <div className="cart__item__container">
            <img alt='cart_item' src={product.picture}/>
            <div className="cart__item__container__info">
                <p>{product.title}</p>
                <div className="cart__item__container__info__action">
                    <button className="cart__item__container__info__action__delete" type="button"/>
                    <button type="button">-</button>
                    <p>1</p>
                    <button type="button">+</button>
                </div>
            </div>
            <div className="cart__item__container__info__price">
                <p>Price:</p>
                <p>${product.price}</p>
            </div>
        </div>
    )
}