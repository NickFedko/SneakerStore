import '../assets/styles/ProductItem.css'
export default function ProductItem (props) {
    const {product} = props;

    return (
        <div className="item__block" id={product.id}>
            <img className="item__block__image" src={product.picture} alt=" "/>
            <p className="item__block__name">{product.title.split(' ').slice(0,4).join(' ')}</p>
            <p className="item__block__price">${product.price}</p>
            <button type="button" className={`item__block__button`} />
        </div>
    )
}