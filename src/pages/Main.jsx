import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import CardPost from '../components/CardPost/CardPost';
import './Main.css'
import RecentAdded from '../components/RecentAdded/RecentAdded';


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

    renderRecents() {
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
                urlImg={`http://localhost:3001/uploads/${post.image}`}
                shortDescription={'bla bla bla bla '}
                link={`/post/${post._id}`
                } />
        })
    }

    renderPosts() {
        return (
            this.state.posts.map((post) => {
                return <CardPost
                    key={post._id}
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
            <div className="container-grid">
                <Navbar categories={this.state.categories} />
                <div className="container mt-2">
                    <div className="row">
                        <h1 className="ml-3 mb-2" style={{ color: "#f1b934" }}>Últimas Notícias</h1>
                    </div>
                    <div className="row">
                        {this.renderPosts()}
                    </div>
                </div>
                <div className='recent d-flex align-items-center flex-column pt-2'>
                    <h4>Adicionados Recentemente</h4>
                    {this.renderRecents()}
                </div>
            </div>
        )
    }
}

export default Main