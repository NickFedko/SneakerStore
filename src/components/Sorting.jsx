import '../assets/styles/Sorting.css'

export default function Sorting() {
    return(
        <form className="sorting__form">
            <input className="sorting__form__search" type="search" placeholder="Search products by name"/>
            <select className="sorting__form__category" placeholder="Choose category">
                <option>
                  Sneakers  
                </option>
                <option>
                    Slippers
                </option>
            </select>
            <select className="sorting__form__sorter" placeholder="Sort by">
                <option>
                    Default
                </option>
                <option>
                    Newest
                </option>
                <option>
                    Most Popular
                </option>
            </select>
        </form>
    )
}