import React, { Component } from 'react'
import './Main.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import CardPost from '../../components/CardPost/CardPost';
import RecentAdded from '../../components/RecentAdded/RecentAdded';
import Footer from '../../components/Footer/Footer';

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

    renderRecents() {

        try {
            let orderByDate = { ...this.state.posts }
            // Object.entries retorna um vetor com as posições enumeráveis, ["1"] contém o objeto de fato
            orderByDate = Object.entries(orderByDate)

            orderByDate.sort((a, b) => {
                return a["1"].createdAt < b["1"].createdAt ? true : false
            })

            orderByDate = orderByDate.slice(0, 5)

            return orderByDate.map((post) => {
                post = post["1"]
                return <RecentAdded
                    id={post._id}
                    key={post._id}
                    title={post.title
                    }
                    urlImg={`${post.image}`}
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
                    author="EA Games"
                    id={post._id}
                    key={post._id}
                    title={post.title}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    urlImg={`${post.image}`}
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
            this.state.error === true ? <Redirect to='/error' /> :
                <div className="container-full">
                    <Navbar categories={this.state.categories && this.state.categories} />
                    <video autoPlay muted loop
                        className='d-none d-sm-block'
                        poster='https://res.cloudinary.com/dswbfrsv0/image/upload/v1555562371/swbf2.jpg'
                        id="myVideo">
                        <source
                            src="https://res.cloudinary.com/dswbfrsv0/video/upload/c_fill,h_760,w_1920,so_2.0,eo_54.0/v1555768941/Star_Wars_Battlefront_II_Launch_Trailer.mp4"
                            type="video/mp4" />
                    </video>

                    <div className="container mt-2">
                        <div className="row align-items-center">
                            <h1 className="col-md-10 mb-2" style={{ color: "#f1b934" }}>Últimas notícias</h1>
                            <h4 className="d-none d-sm-block col-md-2 recent">Adicionados recentemente</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-xl-10">
                                <div className="row">
                                    {this.state.posts && this.renderPosts()}
                                </div>
                            </div>
                            <div className="col-md-4 col-xl-2">
                                {this.state.posts && this.renderRecents()}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
        )
    }
}

export default Main