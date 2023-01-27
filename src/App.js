import { useState } from 'react';
import './assets/styles/App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ModalRegister from './Modal/ModalRegister';
import { AnimatePresence } from 'framer-motion';
import ModalLogin from './Modal/ModalLogin';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import CardPage from './Pages/CardPage';

function App() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <div className="App">
      <Header openModal={setOpenRegisterModal} openLoginModal={setOpenLoginModal}/>
      <AnimatePresence>
        {openRegisterModal && <ModalRegister openModal={setOpenRegisterModal} openLoginModal={setOpenLoginModal}/>}
        {openLoginModal && <ModalLogin openModal={setOpenRegisterModal} openLoginModal={setOpenLoginModal} />}
      </AnimatePresence>
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route exact path='/orders' element={<CardPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
