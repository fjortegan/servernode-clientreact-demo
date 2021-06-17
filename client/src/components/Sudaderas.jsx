import React, { Component } from 'react';

import '../components/css/articles.css'; 

function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export default class ListaUsers extends Component {
  
  // JSON datos vacíos para insertar.
  state = { data: [] };

  componentDidMount() {
    // GET REQUEST AL ENTRAR EN LA PÁGINA
    // Petición async a nuestra url
    const obj = {
        method: 'GET',
        headers: {
          'access-token': getCookie('token')
        }
    };
    fetch('http://localhost:5000/sudaderas', obj)
      // Body a JSON
      .then(response => response.json())
      // and update the state data to said json
      .then(data => this.setState({ data }));
  }

  render() {

    return (
      <div className="container">
        <h1>Sudaderas <span className="trends">TREND</span>INGS <sup>;)</sup></h1>
        <p>Encuentra tu marca favorita y recíbela al instante. Esta categoría tiene el bono activado de entregas rápidas en pedidos realizados antes de las 18:00.</p>
        <div className="sudaderas">
        {
          this.state.data.map(function(sudaderas){
            return <div className="article" key={sudaderas.id}>
              <h2>{sudaderas.name}</h2>
              <p className="price">{sudaderas.price}€</p> 
              <p className="image"><img src={"http://localhost:5000/"+sudaderas.image_path}/></p> 
              <button id="buy">Comprar <i className="far fa-credit-card"></i></button>
              <button id="addtocart">Añadir al carrito <i className="fas fa-shopping-cart"></i></button>
              </div>;
          })
        }
        </div>
      </div>
    );
  }
}

