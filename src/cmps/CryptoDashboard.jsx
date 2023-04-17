import React, { useState, useEffect } from 'react'
import { cryptoService } from '../services/crypto.service'
import AtomLoader from './AtomLoader.jsx'

export const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState([])
  
  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    try {
      const response = await cryptoService.getETHBTC()
      setCryptoData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  

  if (!cryptoData.bitcoin) return (<AtomLoader />)
  return (
    <div className="crypto-dashboard">
      <div className="crypto-item">
        <h3>Bitcoin (BTC)</h3>
        <p>Price: ${cryptoData.bitcoin?.usd?.toLocaleString()}</p>
        <p>
          24h Change: {cryptoData.bitcoin?.usd_24h_change?.toFixed(2)}%
        </p>
      </div>
      <div className="crypto-item">
        <h3>Ethereum (ETH)</h3>
        <p>Price: ${cryptoData.ethereum?.usd?.toLocaleString()}</p>
        <p>
          24h Change: {cryptoData.ethereum?.usd_24h_change?.toFixed(2)}%
        </p>
      </div>
    </div>
  )
}
