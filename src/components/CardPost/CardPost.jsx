import React from 'react'
import './CardPost.css'
import { Link } from 'react-router-dom'

export default props => {
    return (
        <Link to={`${props.link}`}>
            <div class="card-post card mx-3 my-3">
                <img src={props.urlImg} class="card-post-img img-fluid card-img-top" alt={'img'} />
                <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <p class="card-text">{props.shortDescription}</p>
                    <p class="card-text"><small class="text-muted">{props.date}</small></p>
                </div>
            </div>
        </Link>
    )
}
