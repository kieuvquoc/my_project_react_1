import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MenuLeft from './components/MenuLeft';

function App(props) {
  return (
    <div className="App">
      <Header/>
      <section>
        <div className="container">
          <div className="row">
            <MenuLeft/>
            {props.children}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default App;
