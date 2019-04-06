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
            file: '',
            textEditor: '',
            fatherCategory: '',
            fatherCategoryDB: [{ name: 'selecione', id: 0 }],
        }

        this.baseURL = 'http://localhost:3001'

        this.inputImg = React.createRef()
        this.preview = React.createRef()
        this.fatherCategory = React.createRef()

        this.textEditorChange = this.textEditorChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)
        this.redirect = this.redirect.bind(this)
        this.validCategory = this.validCategory.bind(this)
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

    convertBlobAsText() {
        const readerImg = new FileReader()

        readerImg.addEventListener('loadend', (e) => {
            this.setState({
                file: {
                    ...this.state.file,
                    content: e.srcElement.result
                }
            })
        })

        this.setState({
            file: {
                name: this.inputImg.current.files[0].name,
                blobType: this.inputImg.current.files[0].type,
            }
        })

        readerImg.readAsText(this.inputImg.current.files[0])
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
                this.convertBlobAsText()
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
        this.setState({ textEditor: value })
    }

    redirect() {
        if (this.state.redirect) return <Redirect to='/' />
    }

    save(e) {
        e.preventDefault()
        const data = { ...this.state }
        delete data.fatherCategoryDB

        axios.post(`${this.baseURL}/posts`, data)
            .then(data => data.status)
            .then(status => {
                if (status === 201) {
                    this.setState({ redirect: true })
                } else {
                    console.log(status)
                }
            })
    }

    render() {
        return this.redirect() || (
            < div className='container mt-4 mb-4' >
                <h2>Adicionar um post</h2>
                <form className="needs-validation">
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
                            id="category">
                            {this.state.fatherCategoryDB.map((category, idx) => {
                                return <option key={idx.toString()} className="form-control" value={category.id}>{category.name}</option>
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
                    <button className="btn btn-success mt-2" onClick={this.save} type='submit'>Cadastrar</button>
                </form>
            </div >
        )
    }
}

export default AddPost