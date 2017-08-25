import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      superheroes: [],
      superhero: '',
      power: ''
    }
    this.getSuperheroName = this.getSuperheroName.bind(this);
    this.getSuperheroPower = this.getSuperheroPower.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/getsuperheroes')
    .then(response => {
      this.setState({
        superheroes: response.data
      })
      console.log(this.state.superheroes)
    })
  }

  getSuperheroName(name) {
    this.setState({
      superhero: name
    })
  }

  getSuperheroPower(power) {
    this.setState({
      power: power
    })
  }

  onClick() {
    var hero = {
      name: this.state.superhero,
      power: this.state.power
    }
    axios.post('http://localhost:3000/api/addsuperhero', hero)
    .then(response => {
      if(response.status === 200) {
        this.setState({
          superheroes: [...this.state.superheroes, hero],
          superhero: '',
          power: ''
        })
      }
      console.log(response);
    })
  }

  render() {
    var heroes = this.state.superheroes.map((superhero, i) => {
      return(
        <div key={i}>
          <h2> { superhero.name } </h2>
          <h3> { superhero.power } </h3>
        </div>
      )
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div>
          <br/>
          <input value={ this.state.superhero } placeholder="Enter a superhero" onChange={(name) => this.getSuperheroName(name.target.value)} />
          <input value={ this.state.power } placeholder="Enter Power" onChange={(power) => this.getSuperheroPower(power.target.value)} />
          <button onClick={ () => this.onClick() }>Submit</button>
        </div>

        { heroes }
        
      </div>
    );
  }
}

export default App;
