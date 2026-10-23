import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MenuLeft from './components/Layout/MenuLeft';
import MenuAcc from './components/Layout/MenuAcc';
import { useLocation, Link } from 'react-router-dom';
import { ContextProvider } from './components/Product/ContextCart';

function App(props) {
  let location = useLocation();
  return (
      <ContextProvider>
        <Header/>
        <section>
          <div className="container">
            <div className="row">
              {location.pathname === '/cart'||location.pathname === '/wishlist' ?
              (
                <div className="col-sm-9">
                {props.children}
                </div>
              ):
              (
                <>
                  <div className="col-sm-3">
                    {location.pathname.startsWith('/account') ? <MenuAcc/> : <MenuLeft/>}
                  </div>
                  <div className="col-sm-9">
                    {props.children}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        <Footer/>
      </ContextProvider>
  );
}

export default App;
