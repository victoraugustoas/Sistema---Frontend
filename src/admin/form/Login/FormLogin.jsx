import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './FormLogin.css'

import { Link } from 'react-router-dom'
import axios from 'axios'

const initialState = {
	redirect: false,
	email: '',
	password: ''
}
const baseUlr = `http://${process.env.REACT_APP_HOST}`

class App extends Component {

	constructor(props) {
		super(props)

		this.state = initialState

		this.updateField = this.updateField.bind(this)
		this.login = this.login.bind(this)
		this.renderRedirect = this.renderRedirect.bind(this)

		this.textEmailInput = React.createRef()
		this.invalidEmailFeedback = React.createRef()
		this.validEmailFeedback = React.createRef()
	}

	renderRedirect() {
		if (this.state.redirect) {
			return <Redirect to='/logged' />
		}
	}

	login(e) {
		e.preventDefault()

		let user = { ...this.state }
		delete user.redirect

		axios.post(`${baseUlr}`, user)
			.then(resp => resp.data)
			.then(verified => {
				if (verified.verified) {
					this.setState({ redirect: true })
					this.renderRedirect()
				} else {
					console.log('deu ruim')
				}
			})
	}

	validEmail(email) {
		const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?/;
		let emailChecked = regexEmail.test(email)
		console.log(emailChecked, email)
		if (emailChecked) return true
		return false
	}

	updateField(e) {
		if (e.target.id === "email") {
			this.setState({ email: e.target.value })

			if (this.validEmail(e.target.value)) {
				this.textEmailInput.current.classList.remove('is-invalid')

				this.textEmailInput.current.classList.add('is-valid')
				this.validEmailFeedback.current.innerHTML = 'E-mail válido'
			} else {
				this.textEmailInput.current.classList.remove('is-valid')

				this.textEmailInput.current.classList.add('is-invalid')
				this.invalidEmailFeedback.current.innerHTML = 'Digite um email válido'
			}

		}
		if (e.target.id === "password") this.setState({ password: e.target.value })
	}

	renderForm() {
		return (
			<form className="needs-validation" action='/users'>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						ref={this.textEmailInput}
						onChange={this.updateField}
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						required />
					<p ref={this.validEmailFeedback} className="valid-feedback"></p>
					<p ref={this.invalidEmailFeedback} className="invalid-feedback"></p>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input type="password" onChange={this.updateField} className="form-control" id="password" placeholder="Password" />
				</div>
				<div className="form-group">
					<input onClick={this.login} type="submit" className="btn btn-primary" value="Login" />
					<Link to="/signup" className="ml-3 btn btn-secondary">Cadastrar</Link>
				</div>
			</form>
		)
	}

	render() {
		return (
			<div className="Form">
				{this.renderRedirect()}
				{this.renderForm()}
			</div>
		);
	}

}

export default App;
