import React, { Component } from 'react';
import React, { Component } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person.js';

class Login extends Component {

  

	render() {
		return (
			<div className="App">
			<button onClick={this.switchNameHandler}>Click me</button>
			<h1>Hi, I'm a React App </h1>
				<Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
				<Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
				<Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
			</div>
		);
	}
}

export default App;
