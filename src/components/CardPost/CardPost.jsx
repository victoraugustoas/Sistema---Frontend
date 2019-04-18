import React from 'react'
import './CardPost.css'
import { Link } from 'react-router-dom'

export default props => {
    return (
        <div className="card-post card mx-3 my-3">
            <Link className='link-card-post' to={{
                pathname: `${props.link}`,
                state: {
                    id: props.id
                }
            }}>
                <img src={props.urlImg} className="card-post-img img-fluid card-img-top" alt={'img'} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.shortDescription}</p>

                    <p className="card-text"><small className="text-muted">Criado em: {props.date}</small></p>
                    <p className="card-text"><small className="text-muted">Escrito por: {'EA Games'}</small></p>
                </div>
            </Link>
        </div>
    )
}
