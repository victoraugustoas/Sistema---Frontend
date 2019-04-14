import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import parse from 'html-react-parser'

import './Post.css'

export default class Post extends Component {

    constructor(props) {
        super(props)

        this.state = {
            post: {},
            category: {}
        }

        this.baseURL = 'http://localhost:3001'
    }

    componentDidMount() {
        let id = window.location.href.split('/post/')[1]

        axios.get(`${this.baseURL}/posts/${id}`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ post: data })

                axios.get(`${this.baseURL}/categories/${this.state.post.fatherCategory}`)
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
                <Navbar />
                <div className="container">
                    <h1>{this.state.post.title}</h1>
                    <h5><a href='/'>{this.state.category.name}</a></h5>
                    <small className="text-muted">Last updated 3 mins ago</small>
                    <hr />
                    <div className="text">
                        {this.state.post.textEditor ? parse(this.state.post.textEditor) : ''}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}