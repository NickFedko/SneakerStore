import '../assets/styles/ShopItems.css'

import image1 from '../assets/images/1.png'
import image2 from '../assets/images/2.png'
import image3 from '../assets/images/3.png'
import image4 from '../assets/images/4.png'
import image5 from '../assets/images/5.png'
import image6 from '../assets/images/6.png'
import image7 from '../assets/images/7.png'
import image8 from '../assets/images/8.png'
import image9 from '../assets/images/9.png'
import image10 from '../assets/images/10.png'
import image11 from '../assets/images/11.png'
import image12 from '../assets/images/12.png'

export default function ShopItems () {

    const items = [
            {id:1, name:'Item name', price:175.19, image:image1 },
            {id:2, name:'Item name', price:212.54, image:image2 },
            {id:3, name:'Item name', price:185.30, image:image3 },
            {id:4, name:'Item name', price:384.10, image:image4 },
            {id:5, name:'Item name', price:263.08, image:image5 },
            {id:6, name:'Item name', price:302.09, image:image6 },
            {id:7, name:'Item name', price:190.67, image:image7 },
            {id:8, name:'Item name', price:115.02, image:image8 },
            {id:9, name:'Item name', price:155.84, image:image9 },
            {id:10, name:'Item name', price:277.22, image:image10 },
            {id:11, name:'Item name', price:219.43, image:image11 },
            {id:12, name:'Item name', price:346.25, image:image12 },
        ]
    
    return (
        <div className='items'>
            {items.map(item => (
                <div key={item.id} className="item__block">   
                   <img className="item__block__image" src={item.image} />
                    <p className="item__block__name">{item.name}</p>
                    <p className="item__block__price">${item.price}</p>
                    <button type="button" className="item__block__favourite" />
                </div>
            ))}
        </div>
    )
}