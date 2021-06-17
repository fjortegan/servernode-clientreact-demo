import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import PruebaRegister from './components/PruebaRegister.jsx';
import AddingArticle from './components/AddingArticle';
import Sudaderas from './components/Sudaderas.jsx';
import Cart from './components/Cart'

function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

function App() {
  return (
      <Router>
          <Header></Header>
          <Cart></Cart>
          <Route path="/" exact component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={PruebaRegister}/>
          <Route path="/testing" exact component={AddingArticle}/>
          <Route path="/sudaderas" exact component={Sudaderas}/>
      </Router>
  );
}

export default App;