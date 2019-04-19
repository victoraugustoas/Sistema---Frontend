import React, { Component } from 'react'
import './PostsCategory.css'

import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import CardPost from '../CardPost/CardPost'
import Footer from '../Footer/Footer';

class PostsCategory extends Component {

    constructor(props) {
        super(props)

        this.state = {
            url: window.location,
            error: null,
            redirect: false,
            category: {},
            posts: [],
            categories: []
        }

        if (process.env.NODE_ENV === 'development') {
            this.baseURL = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`
        } else {
            this.baseURL = `${process.env.REACT_APP_HOST}`
        }
    }

    async componentDidMount() {
        await axios.get(`${this.baseURL}/categories`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ categories: data })
                this.setCategory()
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

    setCategory() {
        let categoryLocationPath = document.location.pathname.split('/category')[1]
        let category = this.state.categories.filter((category) => {
            return category.path === categoryLocationPath ? true : false
        })
        category = category[0]
        this.setState({ category })
    }

    getCategoryPosts(id) {
        try {
            let orderByDate = { ...this.state.posts }
            // Object.entries retorna um vetor com as posições enumeráveis, ["1"] contém o objeto de fato
            orderByDate = Object.entries(orderByDate)

            orderByDate.sort((a, b) => a["1"].createdAt > b["1"].createdAt ? a : b)
            let orderByDateAndCategory = orderByDate.filter((post) => post["1"].category === id ? true : false)

            return orderByDateAndCategory
        } catch (err) {
            this.setState({ error: true })
            console.log(err)
        }
    }

    renderPosts() {
        try {
            return this.getCategoryPosts(this.state.category._id).map((post) => {
                post = post["1"]
                return <div key={post._id} className="col-sm-12 col-md-8 col-lg-6 d-flex justify-content-center">
                    <CardPost
                        id={post._id}
                        title={post.title}
                        date={new Date(post.createdAt).toLocaleDateString()}
                        urlImg={`${post.image}`}
                        link={`/post/${post._id}`}
                    />
                </div>
            })
        } catch (err) {
            this.setState({ error: true })
            console.log(err)
        }
    }

    render() {
        return (
            this.state.error ? <Redirect to='/error' /> :
                <div className="container-full">
                    <Navbar categories={this.state.categories && this.state.categories} />
                    <div className="container mt-2">
                        <div className="row justify-content-center">
                            {this.state.category && <h1 className="ml-3 mb-2" style={{ color: "#f1b934" }}>Notícias sobre {this.state.category.title}</h1>}
                        </div>
                        <div className="row justify-content-center">
                            {this.state.posts && this.renderPosts()}
                        </div>
                    </div>
                    <Footer />
                </div>
        )
    }
}

export default PostsCategory