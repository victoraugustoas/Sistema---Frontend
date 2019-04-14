import React, { Component } from 'react'

import axios from 'axios'

import Navbar from '../components/Navbar/Navbar'

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }

        this.baseURL = 'http://localhost:3001'
        this.convertTextToBlob = this.convertTextToBlob.bind(this)
    }

    componentWillMount() {
        axios.get(`${this.baseURL}/posts`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ posts: data })
            })
            .catch(err => console.log(err))
    }

    convertTextToBlob() {
        let posts = this.state.posts

        console.log(posts)
    }

    renderPosts() {
        let postCards = (id, title) =>
            <a href={`/post/${id}`}>
                <div key={id.toString()} className="card mb-3" style={{ maxWidth: "540px" }} >
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src='...' className="card-img" alt="..." />
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
            this.state.posts.map((post, idx) => {
                return postCards(post.id, post.title)
            })
        )
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="container mt-2">
                    {this.renderPosts()}
                </div>
            </React.Fragment>
        )
    }
}

export default Main