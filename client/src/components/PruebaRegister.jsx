import React, { Component, Fragment} from 'react';
import axios from 'axios';

import '../components/css/register.css'; 

  export default class PruebaRegister extends Component {
    constructor(props) {
      super(props)

      this.onChangeUserName = this.onChangeUserName.bind(this);
      this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
      this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          name: '',
          email: '',
          password: '',
          formNameError: 'Este campo es obligatorio.',
          formEmailError: 'Este campo es obligatorio.',
          formPasswordError: 'Este campo es obligatorio.'
      }
  }

  
  onChangeUserName(e) {
      this.setState({ name: e.target.value })
  }

  onChangeUserEmail(e) {
      this.setState({ email: e.target.value })
  }

  onChangeUserPassword(e) {
    this.setState({ password: e.target.value })
  }

  onSubmit(e) {
      e.preventDefault()

      const userObject = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
      };
      axios.post('http://localhost:5000/user', userObject)
          .then((res) => {
              console.log(res.data)
              console.log('%c AXIOS POST SUCCESS: Usuario creado ', 'color: #27ae60;');
          }).catch((error) => {
              console.log('%c AXIOS POST ERROR: Error al insertar el usuario: ', 'color: #e74c3c;' + error )
          });

      this.setState({ name: '', email: '', password: '' })
  }

  render() {/*
    const handleForm = event => {
      const isCheckbox = event.target.type === "checkbox";
      this.setState({
        [event.target.name]: isCheckbox
          ? event.target.checked
          : event.target.value
      });
    }*/
    return (
        <Fragment>
        <div className="register">
            <form method="POST" onSubmit={this.onSubmit}>
              <h3>Regístrate en <span className="trends">TRENDS</span></h3>
              <p>Rellena los formularios con tus credenciales.</p>
  
              <label htmlFor="name">Usuario:</label>
              <input type="text" name="name" value={this.state.name} onChange={this.onChangeUserName} autoComplete="off" placeholder="Introduce tu usuario"></input>
              <p className="error">{this.state.formNameError}</p>
              <label htmlFor="email">E-mail:</label>
              <input type="email" name="email" value={this.state.email} onChange={this.onChangeUserEmail} placeholder="Introduce tu contraseña"></input>
  
              <label htmlFor="password">Contraseña:</label>
              <input type="text" name="password" value={this.state.password} onChange={this.onChangeUserPassword} placeholder="Introduce tu contraseña"></input>
  
              <input type="submit" value="Crear cuenta" />
            </form>
      </div>
      </Fragment>
    )
  }
}