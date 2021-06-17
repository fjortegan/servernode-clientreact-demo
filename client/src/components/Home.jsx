import '../components/css/home.css';
import sudaderas from './img/sudaderas.png'
import camisetas from './img/novedades.png'
import zapatillas from './img/zapatillas.png'

function Home() {
    return(
        <div className="Home">
            <section>
                <div className="sectiontext">
                    <h1>Echa un vistazo a nuestras secciones.</h1>
                </div>
                <div className="secciones">
                    <div className="card">
                        <h2>Sudaderas</h2>
                        <img src={sudaderas} alt="Sudaderas sección" />
                        <a href="/sudaderas">IR A CATEGORÍA</a>
                    </div>
                    <div className="card">
                        <h2>Camisetas</h2>
                        <img src={camisetas} alt="Sudaderas sección" />
                        <a href="/camisetas">IR A CATEGORÍA</a>
                    </div>
                    <div className="card">
                        <h2>Zapatillas</h2>
                        <img src={zapatillas} alt="Sudaderas sección" />
                        <a href="/ofertas">IR A CATEGORÍA</a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;