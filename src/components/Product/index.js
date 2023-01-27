import { connect } from 'react-redux';
import trash from '../../assets/images/trash.svg'

const ProductComponent = ({ product, addToCard, removeFromCard }) => {
    const handleAddToCard = () => {
        addToCard(product);
    };

    const handleRemoveFromCard = () => {
        removeFromCard(product.id);
    };

    return (
        <div className="item__container">
            <img 
                className="item__avatar"
                src={product.img}
            />
            <div className='item__column'>
                <h2 className="item__title">{product.title}</h2>
                <div className="item__">
                    <button className="item__delete"><img src={trash} /></button>
                    <button className="item__button__amount">+</button>
                    <p>1</p>
                    <button className="item__button__amount">-</button>
                </div>
            </div>
            <div className="item__price">
                <p>
                    Price:
                </p>
                <p>
                    {product.price}$
                </p>
            </div>
        </div>
    );
};

export const Product = connect(null, (dispatch) => ({
    addToCard: (product) => dispatch({ type: "orders/add", payload: product}),
    removeFromCard: (id) => dispatch({ type: "orders/remove", payload: id})
}))(ProductComponent);