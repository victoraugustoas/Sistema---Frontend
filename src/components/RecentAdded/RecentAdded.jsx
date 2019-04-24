import React from 'react'
import { Link } from 'react-router-dom'
import './RecentAdded.css'

export default props => {
    return <div className="recent-added mt-3 card d-none d-sm-block">
        <img src={props.urlImg} className="card-img-top img-fluid" alt="Adicionado recentemente" />
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <Link to={{
                pathname: `${props.link}`,
                state: {
                    id: props.id
                }
            }} className="btn button">Ver Mais</Link>
        </div>
    </div>
}