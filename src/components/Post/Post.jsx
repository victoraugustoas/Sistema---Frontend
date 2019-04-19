import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import parse from 'html-react-parser'

import './Post.css'

export default class Post extends Component {

    constructor(props) {
        super(props)

        this.state = {
            error: null,
            categories: [],
            post: {},
            category: {},
            id: () => {
                try {
                    return props.location.state.id
                } catch (error) {
                    return window.location.href.split('/post/')[1]
                }
            }
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
            })
            .catch(err => {
                this.setState({ error: true })
                console.log(err)
            })

        await axios.get(`${this.baseURL}/posts/${this.state.id()}`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ post: data })
            })
            .catch(err => {
                this.setState({ error: true })
                console.log(err)
            })
        this.setCategory()
    }

    getCategoryPost() {
        try {
            let orderByDate = { ...this.state.categories }
            // Object.entries retorna um vetor com as posições enumeráveis, ["1"] contém o objeto de fato
            orderByDate = Object.entries(orderByDate)

            orderByDate.sort((a, b) => a["1"].createdAt > b["1"].createdAt ? a : b)
            let orderByDateAndCategory = orderByDate.filter((category) => category["1"]._id === this.state.post.category ? true : false)

            return orderByDateAndCategory[0]['1']
        } catch (err) {
            this.setState({ error: true })
            console.log(err)
        }
    }

    setCategory() {
        let category = this.getCategoryPost()
        this.setState({ category })
    }

    render() {
        return (
            this.state.error ? <Redirect to='/error' /> :
                <React.Fragment>
                    <Navbar categories={this.state.categories} />
                    <div className="container-full">
                        <div className="post container">
                            <div className="img" style={{ backgroundImage: `url('${this.state.post.image}')` }}></div>

                            <h1>{this.state.post.title}</h1>
                            {this.state.category && <h5><a href={`/category${this.state.category.path}`}>{this.state.category.title}</a></h5>}

                            <h6 className='text-muted'>Escrito por: EA Games</h6>
                            <small className="text-muted">Criado em: {new Date(this.state.post.createdAt).toLocaleDateString()}</small>

                            <hr />
                            <div className="text container">
                                {this.state.post.content ? parse(this.state.post.content, {
                                    replace: (domNode) => {
                                        console.log(domNode)
                                        if (!domNode.attribs) return

                                        if (domNode.name === 'img') {
                                            return domNode.attribs.class = 'img-fluid'
                                        }
                                    }
                                }) : ''}
                            </div>

                        </div>
                    </div>
                </React.Fragment>
        )
    }
}