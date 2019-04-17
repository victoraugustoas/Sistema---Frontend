import React from 'react'
import './CardCategory.css'
import { Link } from 'react-router-dom'

export default props => {
    return (
        <div className="card-category card mx-3 my-3">
            <Link className='link-card-category' to={`${props.link}`}>
                <img src={props.urlImg} className="card-category-img img-fluid card-img-top" alt={'img'} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
            </Link>
        </div>
    )
}