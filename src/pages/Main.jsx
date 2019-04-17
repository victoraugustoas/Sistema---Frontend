import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import CardPost from '../components/CardPost/CardPost';
import './Main.css'
import RecentAdded from '../components/RecentAdded/RecentAdded';


class Main extends Component {

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

    componentWillMount() {
        axios.get(`${this.baseURL}/categories`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ categories: data })
            })
            .catch(err => {
                this.setState({ error: true })
                console.log(err)
            })

        axios.get(`${this.baseURL}/posts`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ posts: data })
            })
            .catch(err => {
                this.setState({ error: true })
                console.log(err)
            })
    }

    renderRecents() {

        try {
            let orderByDate = { ...this.state.posts }
            // Object.entries retorna um vetor com as posições enumeráveis, ["1"] contém o objeto de fato
            orderByDate = Object.entries(orderByDate)

            orderByDate.sort((a, b) => a["1"].createdAt > b["1"].createdAt ? a : b)

            orderByDate = orderByDate.slice(0, 5)

            return orderByDate.map((post) => {
                post = post["1"]
                return <RecentAdded
                    key={post._id}
                    title={post.title
                    }
                    urlImg={`${this.baseURL}/uploads/${post.image}`}
                    shortDescription={'bla bla bla bla '}
                    link={`/post/${post._id}`
                    } />
            })
        } catch (err) {
            this.setState({ error: true })
            console.log(err)
        }
    }

    renderPosts() {
        try {
            return this.state.posts.map((post) => {
                return <CardPost
                    key={post._id}
                    title={post.title}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    urlImg={`${this.baseURL}/uploads/${post.image}`}
                    link={`/post/${post._id}`}
                />
            })
        } catch (err) {
            this.setState({ error: true })
            console.log(err)
        }
    }

    render() {
        return (
            this.state.error === true ? <h1>Ocorreu um erro, recarregue a página!</h1> :
                <div className="container-grid">
                    <Navbar categories={this.state.categories && this.state.categories} />
                    <div className="container mt-2">
                        <div className="row">
                            <h1 className="ml-3 mb-2" style={{ color: "#f1b934" }}>Últimas Notícias</h1>
                        </div>
                        <div className="row">
                            {this.state.posts && this.renderPosts()}
                        </div>
                    </div>
                    <div className='recent d-flex align-items-center flex-column pt-2'>
                        <h4>Adicionados Recentemente</h4>
                        {this.state.posts && this.renderRecents()}
                    </div>
                </div>
        )
    }
}

export default Main