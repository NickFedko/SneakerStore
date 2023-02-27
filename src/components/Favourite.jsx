import ProductItem from './ProductItem'

export default function Favourite() {
    const product = {
        id: 1933, 
        title: "American Posh Baby Short Sleeve Onesie", 
        price: 499, 
        picture: "http://ecx.images-amazon.com/images/I/41jog0WawgL._SX342_.jpg"
    }

    return (
        <div className='list__items'>
            <ProductItem product={product}/>
            <ProductItem product={product}/>
            <ProductItem product={product}/>
            <ProductItem product={product}/>  
        </div>
    )
}