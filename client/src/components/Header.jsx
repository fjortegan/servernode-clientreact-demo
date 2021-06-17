import '../components/css/header.css';
import trendslogo from './img/logotrends.png';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div className="Header">
      <div className="display">
        <p>Envíos gratuitos a partir de una compra de 50€ <sup>PROMO</sup></p>
      </div>
        <header>
            <img className="trendslogo" src={trendslogo} alt="Trends logo"/>
            <div className="nav">
              <nav>
                <Link to="/home">
                  HOME
                </Link>
                <Link to="/camisetas">
                  CAMISETAS
                </Link>
                <Link to="/sudaderas">
                  SUDADERAS
                </Link>
                <Link to="/ofertas">
                  OFERTAS
                </Link>
                <Link to="/novedades">
                  NOVEDADES
                </Link>
              </nav>
            </div>
              <div className="useractions">
                <Link to="/login">
                  <i className="fas fa-sign-in-alt"></i>
                </Link>
                <Link to="/register">
                  <i className="far fa-user"></i>
                </Link>
              </div>
        </header>
    </div>
  );
}

export default Header;