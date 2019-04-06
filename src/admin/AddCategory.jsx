import React, { Component } from 'react';
import axios from 'axios'

export default class AddCategory extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            fatherCategory: '',
            fatherCategoryDB: [{ name: 'selecione', id: 0 }],
            description: ''
        }

        this.baseURL = 'http://localhost:3001/categories'
        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)
        this.fatherCategory = React.createRef()
    }

    componentWillMount() {
        axios.get(this.baseURL)
            .then(resp => resp.data)
            .then(data => {
                data = this.state.fatherCategoryDB.concat(data)
                this.setState({ fatherCategoryDB: data })
            })
    }

    save(e) {
        e.preventDefault()

        if (this.state.fatherCategory !== '0') {
            const data = { ...this.state }
            delete data.fatherCategoryDB

            axios.post(this.baseURL, data)
                .then(resp => console.log(resp))
        } else {
            const data = { ...this.state }

            delete data.fatherCategoryDB
            data.fatherCategory = ''

            axios.post(this.baseURL, data)
                .then(resp => console.log(resp))
        }
    }

    handleChange(e) {
        switch (e.target.id) {
            case 'nameCategory':
                this.setState({ name: e.target.value })
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
                    <form>
                        <div className="form-group">
                            <label htmlFor="nameCategory">Nome:</label>
                            <input
                                onChange={this.handleChange}
                                className="form-control"
                                type="text"
                                id="nameCategory"
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
                                    return <option key={idx.toString()} className="form-control" value={category.id} defaultValue="selected">{category.name}</option>
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
                                maxLength="150" />
                        </div>

                        <div className="form-group">
                            <input onClick={this.save} type='submit' className="btn btn-success" value='Cadastrar' />
                        </div>
                    </form>

                </div>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="container mt-4">
                    <h3>Adicionar Categoria</h3>
                    {this.renderForm()}
                </div>
            </React.Fragment>
        )
    }
}