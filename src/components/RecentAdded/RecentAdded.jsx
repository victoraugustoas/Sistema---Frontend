import React from 'react'
import { Link } from 'react-router-dom'
import './RecentAdded.css'

export default props => {
    return <div className="recent-added mt-3 card">
        <img src={props.urlImg} className="card-img-top" alt="Adicionado recentemente" />
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.shortDescription}</p>
            <Link to={`${props.link}`} className="btn button">Ver Mais</Link>
        </div>
    </div>
}