import React, { useState, useEffect } from 'react'
import CountryFlag from './CountryFlag/CountryFlag'
import './style/MainCurrencyExchange.css'
import CurrencyCode from '../assets/countrysFlags.json'
export default function MainCurrencyExchange() {
  const [currencyDropDownDisplayier, setCurrencyDropDownDisplayier] = useState({ display: 'none' })
  const [whichSelectorClicked, setWichSelectorClicked] = useState('');

  const [currencySelected, setCurrencySelected] = useState('MAD')
  const [currencyExchangeTo, setCurrencyExchangeTo] = useState('USD')

  const [curToExch, setCurToExch] = useState(1);
  const [curRate, setCurRate] = useState(0)

  const [ExchengeRate, setExchengeRate] = useState(0)

  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/a78b9d06cd1a3d8e44bb4022/latest/" + currencySelected)
      .then(response => response.json())
      .then(result => setCurRate(result.conversion_rates[currencyExchangeTo]))
      .catch(error => console.log('error', error));

  }, [currencySelected,currencyExchangeTo])

  const handlOneOfSelectorsClicked = (e) => {
    setWichSelectorClicked(e.target.id)
    setCurrencyDropDownDisplayier({ display: 'block' })
  }

  const handlCurrencySelected = (e) => {

    if (whichSelectorClicked === 'base_selector') {
      setCurrencySelected(e.target.id)
      setCurrencyDropDownDisplayier({ display: 'none' })
    } else {
      setCurrencyExchangeTo(e.target.id)
      setCurrencyDropDownDisplayier({ display: 'none' })

    }
  }

  const handlExchange = () => {
    let res = curToExch * curRate
    setExchengeRate(res.toFixed(2))
  }
  const handlCurrencysChanged=()=>{
    setCurrencyExchangeTo(currencySelected)
    setCurrencySelected(currencyExchangeTo)
  }
  return (
    <div className='MainCurrencyExchange'>

      {/* currency_Selector_drop_down */}
      <div className="currency_Selector_drop_down" style={currencyDropDownDisplayier}>
        <div className="dropdown_Closer">
          <i className="fa-solid fa-xmark" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => setCurrencyDropDownDisplayier({ display: 'none' })}></i>
        </div>
        {
          CurrencyCode.filter((item) => item.currency_code !== 'Various').map((item, index) => (
            <div key={index.currency_code} className="countrys_currencys" id={item.currency_code} onClick={handlCurrencySelected}>
              <CountryFlag CurrencyCode={item.currency_code} />
              {item.country}
            </div>
          ))
        }
      </div>
      <div className="currencysSelectors"  >
        <div className="base_selector" style={{ position: 'relative' }} id='base_selector' onClick={handlOneOfSelectorsClicked}>
          <p style={{ position: 'absolute', backgroundColor: 'white', left: '10px', top: '-13px', fontSize: '12px', padding: '2px', color: 'rgba(18, 23, 41, 0.61)' }}>From</p>
          <CountryFlag CurrencyCode={currencySelected} />
          {currencySelected}
          <i className="fa-solid fa-angle-down"></i>
        </div>
        <div className="instantExchange" style={{position:'absolute',zIndex:'1',backgroundColor:'rgb(43, 109, 185)',color:'white',padding:'5px',textAlign:'center',width:'30px',height:'30px',borderRadius:'30px',cursor:'pointer'}} onClick={handlCurrencysChanged}>
        <i class="fa-solid fa-arrow-right-arrow-left"></i>
        </div>
        <div className="exchenge_to_selector" style={{ position: 'relative' }} id='exchenge_to_selector' onClick={handlOneOfSelectorsClicked}>
          <p style={{ position: 'absolute', backgroundColor: 'white', left: '10px', top: '-13px', fontSize: '12px', padding: '2px', color: 'rgba(18, 23, 41, 0.61)' }}>To</p>
          <CountryFlag CurrencyCode={currencyExchangeTo} />
          {currencyExchangeTo}
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>
      <div className="aounth_and_rates">
        <div className="aounth_input" style={{ position: 'relative' }} >
          <label htmlFor="Amount" style={{ position: "absolute", backgroundColor: 'white', left: '10px', top: '-14px', fontSize: '12px', padding: '4px', color: 'rgba(18, 23, 41, 0.61)' }}>Amount</label>
          <input type="text" name='Amount' value={curToExch} onChange={e => setCurToExch(e.target.value)} />
        </div>
        <button className='exchange_button' onClick={handlExchange}>Exchange <i className="fa-solid fa-rotate"></i></button>
        <div className="rate_displayed">
          <div className="to_exchange_rate">
            <small style={{ color: 'rgba(83, 83, 87, 0.699)' }}>{curToExch} <span style={{ marginLeft: '6px', marginRight: '6px' }}>{currencySelected}</span><i className="fa-solid fa-caret-down"></i></small>
          </div>
          <div className="converted_currency_rate">
            <p style={{ color: 'rgb(13, 15, 34, 0.74);' }}>{ExchengeRate}<span style={{ marginLeft: '6px', marginRight: '6px', fontSize: '12px' }}>{currencyExchangeTo}  </span></p>
          </div>
          <div className="rate">
            <p style={{ color: 'rgb(43, 109, 185)', fontSize: '12px' }}>Rate 1 {currencySelected} = {curRate} {currencyExchangeTo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
