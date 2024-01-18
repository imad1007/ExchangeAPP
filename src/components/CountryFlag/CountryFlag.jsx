import React from 'react';
import './style.css';
import CountrysFlags from '../../assets/countrysFlags.json'
export default function CountryFlag({CurrencyCode}) {
  const country = CountrysFlags.find(item=>item.currency_code===CurrencyCode)
  return (
    <>
      <img src={country.flag_url} alt={'image'} style={{width:"50px",height:"40px",borderRadius:'6px'}} />
    </>
  )
}
