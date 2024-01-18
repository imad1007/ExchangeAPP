import { useState } from 'react'
import './App.css'
import MainCurrencyExchange from './components/MainCurrencyExchange';
import SidebarCurrencys from './components/SidebarCurrencys'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  

  return (
    <>
      <div className='container'>
          {/* <SidebarCurrencys/> */}
          <Header/>
          <MainCurrencyExchange/>
          {/* <Footer/> */}
      </div>
    </>
  )
}

export default App
