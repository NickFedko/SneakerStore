import { useState } from 'react';
import './assets/styles/App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ModalRegister from './components/modals/ModalRegister';
import { AnimatePresence } from 'framer-motion';
import ModalLogin from './components/modals/ModalLogin';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CardPage from './pages/CardPage';
import UserPage from './pages/UserPage';

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
      <AnimatePresence>
        {openRegisterModal && <ModalRegister openModal={setOpenRegisterModal} openLoginModal={setOpenLoginModal} />}
        {openLoginModal && <ModalLogin openModal={setOpenRegisterModal} openLoginModal={setOpenLoginModal} isLogined={isLogined} setLogined={setLogined}/>}
      </AnimatePresence>
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route exact path='/orders' element={<CardPage />} />
        <Route exact path='/account' element={<UserPage/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
