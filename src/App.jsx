import { useState } from 'react'
import './App.css'
import MainCurrencyExchange from './components/MainCurrencyExchange';
import SidebarCurrencys from './components/SidebarCurrencys'

function App() {
  

  return (
    <>
      <div className='container'>
          {/* <SidebarCurrencys/> */}
          <MainCurrencyExchange/>
      </div>
    </>
  )
}

export default App
