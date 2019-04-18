import React from 'react'
import './Error.css'

import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
export default class Error extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            error: null,
            redirect: false,
            posts: [],
            categories: []
        }

        if (process.env.NODE_ENV === 'development') {
            this.baseURL = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`
        } else {
            this.baseURL = `${process.env.REACT_APP_HOST}`
        }
    }

    async componentWillMount() {

        await axios.get(`${this.baseURL}/categories`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ categories: data })
            })
            .catch(err => {
                this.setState({ error: true })
                console.log(err)
            })

        await axios.get(`${this.baseURL}/posts`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ posts: data })
            })
            .catch(err => {
                this.setState({ error: true })
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container-full">
                <Navbar categories={this.state.categories} />
                <div className="background-construction"></div>
                <div className="not-found">
                    <h1>Página não encontrada</h1>
                    <hr />
                    <h2>404</h2>
                    <h5>Ainda estamos trabalhando nessa página =D</h5>
                </div>
            </div>
        )
    }

}