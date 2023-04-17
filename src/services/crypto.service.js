import axios from "axios"
import { utilService } from './util.service'
const MARKET_PRICE_KEY = 'marketPriceDB'
const BLOCK_SIZE_KEY = 'blockSizeDB'
const TRADE_VOLUME_KEY = 'tradeVolumeDB'
const ETHBTC_KEY = 'ETHBTCDB'
const ADVANCED_CHART_KEY = 'advancedDB'
export const cryptoService = {
     getRate,
     getETHBTC,
     getAdvancedChartData
}

async function getRate(coins) {
     try {
          const coinsInUsd = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
          return coinsInUsd.data
     } catch (err) {
          console.error(`failed to get coins`, err)
     }
}

async function getETHBTC() {
     const ETHBTCFromStorage = utilService.loadFromStorage(ETHBTC_KEY)
     if (ETHBTCFromStorage) return ETHBTCFromStorage
     try {
          const data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd&include_24hr_change=true')
          utilService.saveToStorage(ETHBTC_KEY, data)
          return data
     } catch (err) {
          console.error(`failed to get coins`, err)
     }
}

async function getAdvancedChartData() {
     const advancedChartFromStorage = utilService.loadFromStorage(ADVANCED_CHART_KEY)
     if (advancedChartFromStorage) return advancedChartFromStorage
     try {
          const btcResponse = await axios.get(
               'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=90&interval=daily'
          )
          const ethResponse = await axios.get(
               'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=90&interval=daily'
          )

          const btcData = btcResponse.data.prices.map(([timestamp, price]) => [timestamp, price])
          const ethData = ethResponse.data.prices.map(([timestamp, price]) => [timestamp, price])
          const data = [
               {
                    name: 'BTC',
                    data: btcData,
               },
               {
                    name: 'ETH',
                    data: ethData,
               },
          ]
          utilService.saveToStorage(ADVANCED_CHART_KEY, data)
          return data
     } catch (err) {
          console.error('Error getting block size:', err)
     }
}

async function getMarketPrice() {
     const marketPricesFromStorage = utilService.loadFromStorage(MARKET_PRICE_KEY)
     if (marketPricesFromStorage) return marketPricesFromStorage
     try {
          const response = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
          const data = response.data
          utilService.saveToStorage(MARKET_PRICE_KEY, data)
          return data
     } catch (err) {
          console.error('Error getting market prices:', err)
          return null
     }
}

async function getConfirmedTransactions() {
     const blockSizeFromStorage = utilService.loadFromStorage(BLOCK_SIZE_KEY)
     if (blockSizeFromStorage) return blockSizeFromStorage
     try {
          const response = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`)
          const data = response.data
          utilService.saveToStorage(BLOCK_SIZE_KEY, data)
          return data
     } catch (err) {
          console.error('Error getting block size:', err)
          return null
     }
}