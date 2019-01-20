import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',

			emailErrorClass: 'd-none',
			emailErrorMessage : '',
			
			passwordErrorClass : 'd-none',
			passwordErrorMessage : '',

			btnClass : 'btn btn-lg btn-signin btn-block',


			checked : false
		};


		this.emailClass = "";
		this.emailMessage = "";
		this.isEmailError = false;

		this.passwordClass = "";
		this.passwordMessage = "";
		this.isPasswordError = false;

		this.btnClass = "";


		this.submitLoginForm = this.submitLoginForm.bind(this);
		this.onChangeHandle = this.onChangeHandle.bind(this);
	}

	onChangeHandle(e) {
		e.preventDefault();
		const fields = document.querySelectorAll('input');
		this.validLoginForm(fields);
	}

	submitLoginForm(e) {
		const fields = document.querySelectorAll('input');
		this.validLoginForm(fields);
	}

	validLoginForm(fields) {
		
		fields.forEach(field => {
			
			if (field.name == "email") { // validate email

				if (!field.name.valid) {
					if (field.validity.valueMissing) {
						// if error
						this.isEmailError = true;
						this.emailMessage = "Input form is empty";
						
					} else if (field.validity.typeMismatch) {
						// if error
						this.isEmailError = true;
						this.emailMessage = "Email text isn't email form";
					} else {
						// if valid
						this.isEmailError = false;
					}
				} else {
					// error
					this.isEmailError = false;
				}

				if (this.isEmailError) {
					this.emailClass = "errors font-italic";

				} else {
					this.tempEmail = field.value;
					this.emailClass = "d-none";
					this.emailMessage = "";
				}
			}


			if (field.name == "password") { // validate password

				if (!field.name.valid) {
					if (field.validity.valueMissing) {
						this.isPasswordError = true;
						this.passwordMessage = "Password text does not satisfy the conditions above";

					} else if (field.validity.tooLong) {
						this.isPasswordError = true;
						this.passwordMessage = "Password text does not satisfy the conditions above";

					} else if (field.validity.tooShort) {
						this.isPasswordError = true;
						this.passwordMessage = "Password text does not satisfy the conditions above";

					} else {
						this.isPasswordError = false;
					}
				} else {
					this.isPasswordError = false;
				}

				if (this.isPasswordError) {
					this.passwordClass = "errors font-italic";
				} else {
					this.tempPassword = field.value;
					this.passwordClass = "d-none";
					this.passwordMessage = "";
				}
			}


			if (this.isPasswordError || this.isEmailError) {
				this.btnClass = 'btn btn-lg btn-signin btn-block disabled';
			} else {
				this.btnClass = 'btn btn-lg btn-signin btn-block';
			}


			this.setState({
				emailErrorClass: this.emailClass,
				emailErrorMessage : this.emailMessage,
				
				passwordErrorClass : this.passwordClass,
				passwordErrorMessage : this.passwordMessage,

				btnClass : this.btnClass
			});


		});

		return true;
	}


	render() {
			return (
				<form onSubmit={this.submitLoginForm} className="form-sigin">
					<div className="text-center mb-4">
						<img className="mb-4" src="/Logo.png" alt="" width="330" height="240" />
					</div>

					<label htmlFor="inputEmail">
						<h6>Email</h6>
					</label>
					<div >
						<input 
							type="email" 
							name="email" 
							ref={email => this.email = email} 
							className="input-control" 
							placeholder="Input email address"
							id="inputEmail"
							onChange={this.onChangeHandle}
						/>
					</div>
					<p className={this.state.emailErrorClass} id="emailError" >{this.state.emailErrorMessage}</p>

					<label htmlFor="inputPassword">
						<h6>Password</h6>
					</label>
					<div >
						<input 
							type="password" 
							name="password" 
							maxLength="12" 
							minLength="6" 
							className="input-control" 
							placeholder="Input password" 
							id="inputPassword"
							onChange={this.onChangeHandle}
						/>
					</div>
					<p className={this.state.passwordErrorClass} id="passwordError" >{this.state.passwordErrorMessage}</p>

					<div className="checkbox mb-3">
						<input type="checkbox" value="remember-me" className="checkmark" name="remember" /> 
						&nbsp;&nbsp;&nbsp;
						<label>
							<h6>Remember me</h6>
						</label>

					</div>
					<button className={this.state.btnClass} type="submit">Sign In</button>
				</form>

			);
		}
	}

	class App extends React.Component {
		render() {
			return (
				<div className="container">
				<LoginForm />
				</div>
			);
		}
	}

ReactDOM.render(<App />, document.getElementById('root'));
