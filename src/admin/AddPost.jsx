import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import TextEditor from '../components/TextEditor/TextEditor'

class AddPost extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
            title: '',
            file: null,
            content: '',
            fatherCategory: '',
            fatherCategoryDB: [{ name: 'selecione', id: 0 }],
        }

        this.baseURL = `http://${process.env.REACT_APP_HOST}`

        this.inputImg = React.createRef()
        this.preview = React.createRef()
        this.fatherCategory = React.createRef()

        this.textEditorChange = this.textEditorChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)
        this.redirect = this.redirect.bind(this)
        this.validCategory = this.validCategory.bind(this)

        this.fail = React.createRef()
        this.sucess = React.createRef()
    }

    componentWillMount() {
        axios.get(`${this.baseURL}/categories`)
            .then(resp => resp.data)
            .then(data => {
                data = this.state.fatherCategoryDB.concat(data)
                this.setState({ fatherCategoryDB: data })
            })
    }

    previewImage() {
        const img = document.createElement('img')
        img.classList.add('img-fluid', 'mt-2')
        img.file = this.inputImg.current.files[0]
        this.preview.current.appendChild(img)

        const reader = new FileReader()
        reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img)
        reader.readAsDataURL(this.inputImg.current.files[0])
    }

    validCategory() {
        if (this.fatherCategory.current.value === '0') {
            this.fatherCategory.current.classList.add('is-invalid')
        } else {
            this.fatherCategory.current.classList.remove('is-invalid')
        }
    }

    handleChange(e) {
        switch (e.target.id) {
            case 'title':
                this.setState({ title: e.target.value })
                break
            case 'img':
                this.setState({ file: this.inputImg.current.files[0] })
                this.previewImage()
                break
            default:
                break
        }
        this.setState({ fatherCategory: this.fatherCategory.current.value })
        this.validCategory()
        console.log(this.state)
    }

    textEditorChange(value) {
        this.setState({ content: value })
    }

    redirect() {
        if (this.state.redirect) return <Redirect to='/' />
    }

    save(e) {
        e.preventDefault()
        const data = { ...this.state }
        delete data.fatherCategoryDB

        const form = new FormData()
        form.append('title', this.state.title)
        form.append('content', this.state.content)
        form.append('file', this.state.file)
        form.append('category', this.state.fatherCategory)

        axios.post(`${this.baseURL}/posts`, form)
            .then(resp => {
                // criada com sucesso
                if (resp.status === 201) {
                    let msgRedirect = document.createElement('div')
                    let msgServer = document.createElement('p')
                    msgServer.innerHTML = resp.data.msg

                    this.sucess.current.appendChild(msgServer)
                    this.sucess.current.appendChild(msgRedirect)

                    this.sucess.current.classList.remove('invisible')
                    this.fail.current.classList.add('invisible')

                    // redireciona após 10 segundos
                    setTimeout(() => {
                        this.setState({ redirect: true })
                    }, 5 * 1000)

                    this.refreshText(5, msgRedirect)
                }
            })
            .catch(err => {
                let msgServer = document.createElement('div')
                msgServer.innerHTML = err.response.data.msg

                this.fail.current.appendChild(msgServer)

                this.fail.current.classList.remove('invisible')
            })
    }

    refreshText(seg, elem) {
        // atualiza o texto de redirecinamento
        let sec = seg

        setInterval(() => {
            sec -= 1
        }, 1000)

        setInterval(() => {
            elem.innerHTML = `Redirecionando em ${sec} segundos`
        }, 10);
    }

    renderForm() {
        return (
            <form onSubmit={this.save} className="needs-validation" encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="title">Titulo:</label>
                    <input
                        onChange={this.handleChange}
                        className="form-control"
                        type="text"
                        id="title"
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Categoria:</label>
                    <select
                        onChange={this.handleChange}
                        ref={this.fatherCategory}
                        className="form-control"
                        required
                        id="category">
                        {this.state.fatherCategoryDB.map((category, idx) => {
                            return <option key={idx.toString()} className="form-control" value={category._id}>{category.title}</option>
                        })}
                    </select>
                    <div className='invalid-feedback'>
                        Selecione uma categoria!
                        </div>
                </div>

                <div className="form-group">
                    <label htmlFor="img">Imagem:</label>
                    <input
                        id='img'
                        onChange={this.handleChange}
                        ref={this.inputImg}
                        className="form-control-file"
                        type="file"
                        required />
                    <div ref={this.preview}></div>
                </div>
                <hr />
                <h5>Conteúdo</h5>
                <TextEditor onChange={this.textEditorChange} />
                <button className="btn btn-success mt-2" onClick={() => window.location = window.location.href + `#inicio`} type='submit'>Cadastrar</button>
            </form>
        )
    }

    render() {
        return this.redirect() || (
            <div id="inicio" className='container mt-4 mb-4'>
                <div ref={this.fail} className="alert alert-danger invisible" role="alert"></div>
                <div ref={this.sucess} className="alert alert-success invisible" role="alert"></div>
                <h2>Adicionar um post</h2>
                {this.renderForm()}
            </div>
        )
    }
}

export default AddPost
