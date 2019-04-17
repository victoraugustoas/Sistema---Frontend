import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class AddCategory extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
            title: '',
            fatherCategory: '',
            fatherCategoryDB: [{ title: 'selecione', id: 0 }],
            description: ''
        }

        if (process.env.NODE_ENV === 'development') {
            this.baseURL = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`
        } else {
            this.baseURL = `${process.env.REACT_APP_HOST}`
        }

        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)

        this.fatherCategory = React.createRef()
        this.sucess = React.createRef()
        this.fail = React.createRef()
    }

    componentWillMount() {
        axios.get(`${this.baseURL}/categories`)
            .then(resp => resp.data)
            .then(data => {
                data = this.state.fatherCategoryDB.concat(data)
                this.setState({ fatherCategoryDB: data })
            })
    }

    save(e) {
        e.preventDefault()
        let data = null

        // caso a categoria pai não seja nenhuma
        if (this.state.fatherCategory !== '0') {
            data = { ...this.state }
            delete data.fatherCategoryDB

        } else {
            // caso a categoria pai seja selecionada
            data = { ...this.state }

            delete data.fatherCategoryDB
            data.fatherCategory = ''
        }

        axios.post(`${this.baseURL}/categories`, data)
            .then(resp => {

                // criada com sucesso
                if (resp.status === 201) {
                    let msgRedirect = document.createElement('div')
                    let msgServer = document.createElement('p')
                    msgServer.innerHTML = resp.data.msg

                    this.sucess.current.appendChild(msgServer)
                    this.sucess.current.appendChild(msgRedirect)

                    this.sucess.current.classList.remove('d-none')
                    this.fail.current.classList.add('d-none')

                    // redireciona após 10 segundos
                    setTimeout(() => {
                        this.setState({ redirect: true })
                    }, 10 * 1000)

                    this.refreshText(10, msgRedirect)
                }
            }).catch((err) => {
                let msgServer = document.createElement('div')
                msgServer.innerHTML = err.response.data.msg

                this.fail.current.appendChild(msgServer)

                this.fail.current.classList.remove('d-none')
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

    handleChange(e) {
        switch (e.target.id) {
            case 'nameCategory':
                this.setState({ title: e.target.value })
                break
            default:
                this.setState({ description: e.target.value })
                break
        }
        this.setState({ fatherCategory: this.fatherCategory.current.value })
    }

    renderForm() {
        return (
            <div className="card">
                <div className="card-body">
                    <form onSubmit={this.save}>
                        <div className="form-group">
                            <label htmlFor="nameCategory">Titulo:</label>
                            <input
                                onChange={this.handleChange}
                                className="form-control"
                                type="text"
                                id="nameCategory"
                                required
                                placeholder="Digite o nome da categoria" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fatherCategory">Categoria Pai:</label>
                            <select
                                ref={this.fatherCategory}
                                onChange={this.handleChange}
                                className="form-control"
                                id="fatherCategory">
                                {this.state.fatherCategoryDB.map((category, idx) => {
                                    return <option key={idx.toString()} className="form-control" value={category.id} defaultValue="selected">{category.title}</option>
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição:</label>
                            <textarea
                                onChange={this.handleChange}
                                className="form-control"
                                type="text"
                                id="description"
                                required
                                maxLength="150" />
                        </div>

                        <div className="form-group">
                            <input type='submit' className="btn btn-success" value='Cadastrar' />
                        </div>
                    </form>

                </div>
            </div>
        )
    }

    render() {
        return (
            this.state.redirect ? <Redirect to='/' /> :
                <React.Fragment>
                    <div className="container mt-4">
                        <div ref={this.fail} className="alert alert-danger d-none" role="alert"></div>
                        <div ref={this.sucess} className="alert alert-success d-none" role="alert"></div>
                        <h3>Adicionar Categoria</h3>
                        {this.renderForm()}
                    </div>
                </React.Fragment>
        )
    }
}