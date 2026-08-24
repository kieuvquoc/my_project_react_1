import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MenuLeft from './components/Layout/MenuLeft';

function App(props) {
  return (
    <>
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
    </>
  );
}

export default App;
