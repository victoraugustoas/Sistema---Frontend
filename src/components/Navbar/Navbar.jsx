import React from 'react'
import './Navbar.css'
import { Link, Redirect } from 'react-router-dom'
import logo from '../../assets/img/logo_bf2.png'

function renderCategories(categories) {
    try {
        return categories.map((category, idx) => {
            return <a
                className="dropdown-item"
                key={idx.toString()}
                href={`/category${category.path}`}>
                {category.title}
            </a>
        })
    } catch (error) {
        console.log(error)
        return <Redirect to='/error' />
    }
}

export default props => (
    <nav className="navbar navbar-expand-lg py-3">

        <div className="logo">
            <Link to='/'>
                <img src={logo} alt={"Logo"} />
            </Link>
        </div>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-ellipsis-v icon-menu"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="ml-3 mt-3 nav-item">
                    <a className="btn button" href="/">Home</a>
                </li>

                <li className="ml-3 mt-3 dropdown">
                    <a className="btn button dropdown-toggle" href="/category"
                        role="button" id="dropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Categorias
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {props.categories && renderCategories(props.categories)}
                    </div>
                </li>

                <li className="ml-3 mt-3 nav-item">
                    <a href="/multiplayer" className="btn button">Multiplayer</a>
                </li>

                <li className="ml-3 mt-3 nav-item">
                    <a href="/posts" className="btn button">Sobre o Jogo</a>
                </li>

            </ul>
        </div>

    </nav>
)
