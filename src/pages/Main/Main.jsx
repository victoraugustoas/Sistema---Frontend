import React, { Component } from 'react'
import './Main.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import CardPost from '../../components/CardPost/CardPost'
import RecentAdded from '../../components/RecentAdded/RecentAdded'
import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading'
import SectionContent from '../../components/SectionContent/SectionContent'

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            error: null,
            redirect: false,
            posts: [],
            categories: [],
            numberOfPosts: 6,
            numberOfRecents: 3
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
                this.setState({ loading: false })
                this.setState({ categories: data })
            })
            .catch(err => {
                this.setState({ error: true })
                console.log(err)
            })

        await axios.get(`${this.baseURL}/posts`)
            .then(resp => resp.data)
            .then(data => {
                this.setState({ loading: false })
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

            orderByDate = orderByDate.slice(0, this.state.numberOfRecents)

            return orderByDate.map((post) => {
                post = post["1"]
                return <RecentAdded
                    id={post._id}
                    key={post._id}
                    title={post.title}
                    urlImg={`${post.image}`}
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
            let x = this.state.posts.slice(0, this.state.numberOfPosts)
            x = x.map((post) => {
                return <CardPost
                    author="Victor Augusto"
                    id={post._id}
                    key={post._id}
                    title={post.title}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    urlImg={`${post.image}`}
                    link={`/post/${post._id}`}
                />
            })
            return x
        } catch (err) {
            this.setState({ error: true })
            console.log(err)
        }
    }

    render() {
        return (
            this.state.error === true ? <Redirect to='/error' /> :
                this.state.loading ? <Loading /> :
                    <div className="container-full">
                        <Navbar categories={this.state.categories && this.state.categories} />
                        <div className="video">
                            {window.innerWidth < 768 ? '' :
                                <video autoPlay muted loop
                                    className='d-none d-sm-block'
                                    poster='https://res.cloudinary.com/dswbfrsv0/image/upload/v1555562371/swbf2.jpg'
                                    id="myVideo">
                                    <source
                                        src="https://res.cloudinary.com/dswbfrsv0/video/upload/c_fill,h_760,w_1920,so_2.0,eo_54.0/v1555768941/Star_Wars_Battlefront_II_Launch_Trailer.mp4"
                                        type="video/mp4" />
                                </video>
                            }
                        </div>
                        <SectionContent
                            url='/'
                            headTitle='Heróis nascem no Battlefront'
                            title=' Esse é o <em>Star Wars</em> Battlefront II'
                            description=' Descubra tudo que sempre quis saber sobre os mapas, modos e todos os detalhes da campanha para um jogador e do multiplayer de Star Wars Battlefront II.'
                            urlImg='https://res.cloudinary.com/dswbfrsv0/image/upload/b_black,o_50/v1556088353/thumb-1920-823125.png' />
                        <div className="container mt-2">
                            <div className="row align-items-center">
                                <h1 className="col-md-8 col-xl-10 mb-2" style={{ color: "#f1b934" }}>Últimas notícias</h1>
                                <h4 className="d-none d-sm-block col-md-4 col-xl-2 recent">Adicionados recentemente</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-xl-10">
                                    <div className="row">
                                        {this.state.posts && this.renderPosts()}
                                    </div>
                                </div>
                                <div className="col-md-4 col-xl-2">
                                    <div className="row">
                                        {this.state.posts && this.renderRecents()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SectionContent
                            url='/'
                            headTitle='Batalhas Espaciais'
                            title='Ataque com caças estelares'
                            description='Entre na cabine do Caça Estelar de Yoda, da Cimitarra de Darth Maul e em uma frota inteira de outras naves, nas batalhas espaciais multiplayer baseadas em objetivos. Mude o curso da batalha com controles aprimorados e caças estelares personalizáveis, em enfrentamentos gigantescos por todas as três eras cinematográficas de Star Wars .'
                            urlImg='https://res.cloudinary.com/dswbfrsv0/image/upload/b_black,o_30/v1556087994/thumb-1920-823131.jpg' />
                        <Footer />
                    </div>
        )
    }
}

export default Main