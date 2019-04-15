import React, { Component } from 'react'

import axios from 'axios'

import Navbar from '../components/Navbar/Navbar'

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            categories: []
        }

        this.baseURL = 'http://localhost:3001'
    }

    componentWillMount() {
        axios.get(`${this.baseURL}/categories`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ categories: data })
            })
            .catch(err => console.log(err))

        axios.get(`${this.baseURL}/posts`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ posts: data })
            })
            .catch(err => console.log(err))
    }

    renderPosts() {
        let postCards = (id, title, url) =>
            <a className="mr-3" href={`/post/${id}`}>
                <div key={id} className="card mb-3" style={{ maxWidth: "540px" }} >
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={url} className="card-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                            </div>
                        </div>
                    </div>
                </ div>
            </a>

        return (
            this.state.posts.map((post) => {
                return postCards(post._id, post.title, `http://localhost:3001/uploads/${post.image}`)
            })
        )
    }

    render() {
        return (
            <React.Fragment>
                <Navbar categories={this.state.categories} />
                <div className="container mt-2">
                    <div className="row">
                        {this.renderPosts()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Main