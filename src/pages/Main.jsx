import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import CardPost from '../components/CardPost/CardPost';
import './Main.css'


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
        return (
            this.state.posts.map((post) => {
                return <CardPost
                    title={post.title}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    urlImg={`http://localhost:3001/uploads/${post.image}`}
                    link={`/post/${post._id}`}
                />
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