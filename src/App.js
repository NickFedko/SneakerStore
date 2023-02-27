import { useState } from 'react';
import './assets/styles/App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import AuthModal from "./components/modals/AuthModal";
import { ToastContainer } from 'react-toastify';

function App() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isLogined, setLogined] = useState(false);

  return (
    <div className="App">
      <Header 
        openModal={setOpenRegisterModal} 
        openLoginModal={setOpenLoginModal}
        isLogined={isLogined}
        setLogined={setLogined}
      />
      <ToastContainer />
      <AnimatePresence>
        {openRegisterModal && <AuthModal
          openRegisterModal={openRegisterModal}
          setOpenRegisterModal={setOpenRegisterModal}
          openLoginModal={openLoginModal}
          setOpenLoginModal={setOpenLoginModal} />
        }
        {openLoginModal && <AuthModal
          openRegisterModal={openRegisterModal}
          setOpenRegisterModal={setOpenRegisterModal}
          openLoginModal={openLoginModal}
          setOpenLoginModal={setOpenLoginModal} />
        }
      </AnimatePresence>
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route exact path='/orders' element={<CartPage />} />
        <Route exact path='/account' element={<AccountPage/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
