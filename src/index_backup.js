import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
/*
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="root-container">
				<div className="box-controller">
					<div className="controller">
						Login
					</div>
					<div className="controller">
						Register
					</div>
				</div>  
			</div>
		);
	}
}

class LoginBox extends Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			username : '',
			password : '',
			error : ''
		};

		this.inputUsername = this.inputUsername.bind(this);
		this.inputPassword = this.inputPassword.bind(this);
	}

	inputUsername(e) {
		this.setState({
			username : e.target.value
		});
	}

	inputPassword(e) {
		this.setState({
			password : e.target.value
		});
	}

	submitLogin(e) {
		
	}


  	render() {

    return (
			<div className="inner-container">
				<div className="box">
					<div className="input-group">
						<label htmlFor="username">Username</label>
						<input onChange={this.inputUsername} type="text" name="username" className="login-input" placeholder="Username" />
					</div>


					<div className="input-group">
						<label htmlFor="password">Password</label>
						<input onChange={this.inputPassword} type="text" name="password" className="login-input" placeholder="Password" />
					</div>

					<button type="button" className="login-btn" onClick={this.submitLogin.bind(this)}>Login</button>
				</div>
			</div>
	    );
	}	
}


ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<LoginBox />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
*/

class BasicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'jasonmalfatto@moduscreate.com',
      password: '',
      passwordConfirm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.target.classList.add('active');

    this.setState({
      [e.target.name]: e.target.value
    });

    this.showInputError(e.target);
  }

  handleSubmit(e) {    
    e.preventDefault();

    console.log('Component state:', JSON.stringify(this.state));

    if (!this.showFormErrors()) {
      console.log('Form is invalid: do not submit');
    } else {
      console.log('Form is valid: submit');
    }
  }

  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;

    inputs.forEach(input => {
      input.classList.add('active');

      const isInputValid = this.showInputError(input);

      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(input) {
    const name = input.name;
    const validity = input.validity;
    const label = document.getElementById(`${name}Label`).textContent;
    const error = document.getElementById(`${name}Error`);

    const isPassword = name.indexOf('password') !== -1;
    const isPasswordConfirm = name === 'passwordConfirm';
    if (isPasswordConfirm) {
      if (this.password.value !== this.passwordConfirm.value) {
        this.passwordConfirm.setCustomValidity('Passwords do not match');
      } else {
        this.passwordConfirm.setCustomValidity('');
      }
    }

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`; 
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`; 
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be longer than 4 chars`; 
      } else if (isPasswordConfirm && validity.customError) {
        error.textContent = 'Passwords do not match';
      }
      return false;
    }

    error.textContent = '';
    return true;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div className="form-group">
          <label id="usernameLabel">Username</label>
          <input type="email" name="username"
                 ref={username => this.username = username}
                 value={this.state.username} onChange={this.handleChange}
                 className="form-control" required />
          <div className="error" id="usernameError" />
        </div>

        <div className="form-group">
          <label id="passwordLabel">Password</label>
          <input type="password" name="password"
                 ref={password => this.password = password}
                 value={this.state.password} onChange={this.handleChange}
                 className="form-control" pattern=".{5,}" required />
          <div className="error" id="passwordError" />
        </div>

        <div className="form-group">
          <label id="passwordConfirmLabel">Confirm Password</label>
          <input type="password" name="passwordConfirm"
                 ref={passwordConfirm => this.passwordConfirm = passwordConfirm}
                 value={this.state.passwordConfirm} onChange={this.handleChange}
                 className="form-control" required />
          <div className="error" id="passwordConfirmError" />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <BasicForm />
        <p className="note">Note: see console for submit event logging</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
