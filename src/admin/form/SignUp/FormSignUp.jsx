import React, { Component } from 'react';
// import './FormLogin.css'

import axios from 'axios'

const initialState = {
	email: '',
	password: ''
}
const baseUlr = 'http://localhost:3001/users'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = initialState

		this.updateField = this.updateField.bind(this)
		this.save = this.save.bind(this)

		this.textEmailInput = React.createRef()
		this.invalidEmailFeedback = React.createRef()
		this.validEmailFeedback = React.createRef()
		this.passwordField = React.createRef()
		this.msgSuccess = React.createRef()
	}

	save(e) {
		e.preventDefault()

		axios.post(baseUlr, this.state)
			.then(resp => resp.data)
			.catch(msg => {
				if (msg.response.status === 400) {
					this.invalidEmailFeedback.current.innerHTML = msg.response.data
					this.textEmailInput.current.classList.add('is-invalid')
					this.textEmailInput.current.classList.remove('is-valid')
					return true
				}
			}).then((passed) => {
				if (!passed) {
					this.setState({ ...initialState })

					this.textEmailInput.current.value = ''
					this.passwordField.current.value = ''

					this.msgSuccess.current.classList.add('alert', 'alert-success')
					this.msgSuccess.current.classList.remove('d-none')

					this.validEmailFeedback.current.innerHTML = ''
					this.textEmailInput.current.classList.remove('is-valid')
					this.invalidEmailFeedback.current.innerHTML = ''
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
					<input
						ref={this.passwordField}
						type="password"
						onChange={this.updateField}
						className="form-control"
						id="password"
						placeholder="Password" />
				</div>
				<div className="form-group">
					<input onClick={this.save} type="submit" className="btn btn-primary" value="Salvar" />
				</div>
				<div className="form-group">
					<p ref={this.msgSuccess} className="d-none">Cadastro realizado com sucesso!</p>

				</div>
			</form>
		)
	}

	render() {
		return (
			<div className="Form">
				{this.renderForm()}
			</div>
		);
	}

}

export default App;
