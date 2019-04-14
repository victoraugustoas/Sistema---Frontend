import React from 'react';

export default props => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <a className="navbar-brand" href="/">Navbar</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/">Link</a>
                </li>

                <li className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href="/"
                        role="button" id="dropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Categorias
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {props.categories.map((category, idx) => {
                            return <a className="dropdown-item" key={idx.toString()} href={category.path}>{category.title}</a>
                        })}
                    </div>

                </li>

            </ul>
        </div>

    </nav>
)
