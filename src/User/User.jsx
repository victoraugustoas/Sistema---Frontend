import React, { Component } from 'react';
import axios from 'axios'

const baseUlr = 'http://localhost:3001/users'

const initialState = { data: [] }

export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = initialState
    }

    componentWillMount(){
        this.getUsers()
    }

    getUsers() {
        axios.get(baseUlr)
            .then(resp => resp.data)
            .then(data => {
                console.log(data)
                this.setState({ data: data })
            })
    }

    renderRows() {
        return this.state.data.map((dado) => (
            <tr key={dado.id}>
                <td>{dado.id}</td>
                <td>{dado.email}</td>
                <td>{dado.password}</td>
            </tr>
        ))
    }

    renderTable() {
        return (
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Senha</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            this.renderTable()
        )
    }
}