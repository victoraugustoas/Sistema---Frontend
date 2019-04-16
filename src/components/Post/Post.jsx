import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import parse from 'html-react-parser'

import './Post.css'

export default class Post extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            post: {},
            category: {}
        }

        this.baseURL = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`
    }

    componentDidMount() {

        axios.get(`${this.baseURL}/categories`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ categories: data })
            })
            .catch(err => console.log(err))

        let id = window.location.href.split('/post/')[1]

        axios.get(`${this.baseURL}/posts/${id}`)
            .then(resp => resp.data)
            .then(data => {
                console.log(data)
                this.setState({ post: data })

                axios.get(`${this.baseURL}/categories/${this.state.post.category}`)
                    .then(resp => resp.data)
                    .then(data => {
                        this.setState({ category: data })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <React.Fragment>
                <Navbar categories={this.state.categories} />
                <div className="container">
                    <h1>{this.state.post.title}</h1>
                    <h5><a href='/'>{this.state.category.title}</a></h5>
                    <small className="text-muted">Criado em: {new Date(this.state.post.createdAt).toLocaleDateString()}</small>
                    <hr />
                    <div className="text">
                        {this.state.post.content ? parse(this.state.post.content) : ''}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}