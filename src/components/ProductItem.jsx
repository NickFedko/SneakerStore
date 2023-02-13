import '../assets/styles/ProductItem.css'
export default function ProductItem (props) {

    return (
        <div key={props.key} className="item__block" id={props.id}>   
            <img className="item__block__image" src={props.picture} alt=" "/>
            <p className="item__block__name">{props.title.split(' ').slice(0,5).join(' ')}</p>
            <p className="item__block__price">${props.price}</p>
            <button type="button" className={`item__block__button`} />
        </div>
    )
}