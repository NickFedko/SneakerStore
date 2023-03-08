import './assets/styles/App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import { ToastContainer } from 'react-toastify';
import OrderHistory from './components/OrderHistory';
import Favourite from './components/Favourite';

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route exact path='/orders' element={<CartPage />} />
        <Route exact path='/account' element={<AccountPage/>} />
        <Route exact path='/account/order_history' element={<OrderHistory />} />
        <Route exact path='/account/favourite' element={<Favourite/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
