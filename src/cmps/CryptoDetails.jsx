import React, { Component } from 'react'
const ORANGE = 'ORANGE',
BLUE = 'BLUE',
GREEN = 'GREEN',
GRAY = 'GRAY'

const getCoinIcon = symbol => {
  return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/${symbol.toLowerCase()}.svg`;
}

const getCoinColor = symbol => {
  switch (symbol) {
    case 'ETH':
    case 'XRP':
    case 'ADA':
    case 'XLM':
    case 'XEM':
    case 'LSK':
    case 'DASH':
      return BLUE;
    case 'BCH':
    case 'USDT':
    case 'NEO':
      return GREEN;
    case 'BTC':
    case 'XMR':
      return ORANGE;
    case 'TRX':
    case 'EOS':
    case 'LTC':
    default:
      return GRAY;}

};

const data = [
{
  id: 1,
  name: "Bitcoin",
  symbol: "BTC",
  rank: 1,
  price: "9,159.68",
  change24hr: "1.3",
  cap: "168,679,164,784",
  volume: "18,357,859,654",
  circulating: "18,415,393",
  img: getCoinIcon("BTC"),
  color: getCoinColor("BTC") },

{
  id: 2,
  name: "Ethereum",
  symbol: "ETH",
  rank: 2,
  price: "230.47",
  change24hr: "1.44",
  cap: "25,699,790,870",
  volume: "7,122,827,657",
  circulating: "111,511,971",
  img: getCoinIcon("ETH"),
  color: getCoinColor("ETH") },

{
  id: 3,
  name: "Tether",
  symbol: "USDT",
  rank: 3,
  price: "1.00",
  change24hr: "0.35",
  cap: "9,224,337,233",
  volume: "22,616,885,934",
  circulating: "9,187,991,663",
  img: getCoinIcon("USDT"),
  color: getCoinColor("USDT") }]

export class CryptoDetails extends Component {
     constructor(props){
          super(props)
          this.getCoins = this.getCoins.bind(this)
          this.setIndex = this.setIndex.bind(this)
          this.state = {
               coins: [],
               index: 0,
               updating: false,
               isLoading: false,
               isShowingTooltip: true
          }
     }

  componentDidMount(){
    this.getCoins()
    // particlesJS("particles", particlesConfig)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.index !== this.state.index){
      if(this.state.isShowingTooltip){
        this.setState({isShowingTooltip: false})
      }       
      this.setState({updating: true})
      setTimeout(() => {
        this.setState({updating: false})
      }, 200)
    }
  }

  getCoins(){
    this.setState({isLoading: true})
    setTimeout(() => {
      this.setState({coins: data })
      this.setState({isLoading: false});
    }, 1000);
  }

  mapCoins(coins){
    return coins.map(coin => ({
      name: coin.name,
      symbol: coin.symbol,
      rank: coin.rank,
      price: formatNum(coin.price_usd),
      change24hr: coin.percent_change_24h,
      cap: formatNum(coin.market_cap_usd),
      volume: formatNum(coin['24h_volume_usd']),
      circulating: formatNum(coin.available_supply),
      img: this.getCoinIcon(coin.symbol.toLowerCase()),
      color: getCoinColor(coin.symbol)
    }))
  }

  setIndex(index){
    this.setState({index})
  }
  
  render(){
    const {
      coins, 
      index, 
      updating,
      isLoading, 
      isShowingTooltip
    } = this.state
    let card = null
    if(isLoading){
      card = (
        <div id="card-loading">
          <div id="card-loading-spinner"/>
        </div>
      )   
    }
    else if(coins.length > 0){
      card = (
        <Card 
          coins={coins} 
          index={index}
          setIndex={this.setIndex}
        />
      )  
    }
    
    return(
      <div id="app" className={updating ? 'updating' : ''}>
        {/* <div id="particles"/>
        <div id="help-tooltip" className={isShowingTooltip ? 'showing' : 'hide'}>
          <i className="fa fa-question-circle-o"/>
          <h1><span className="text">Hover over the coin icon and scroll.</span><span className="triangle"/></h1>
        </div> */}
        {card}
      </div>
    )
  }
}

class Card extends React.Component{
  determineSign(num){
    return parseFloat(num) >= 0 ? 'positive' : 'negative'
  }
  render(){
    const {coins, index} = this.props,
          coin = coins[index],
          colorClass = getColorClass(coin.color)
    return(
      <div id="card-wrapper" className={colorClass}>
        <div id="card">
          <div id="card-left" className="card-half">
            <div id="coin-icon" style={{backgroundImage: `url(${coin.img})`}}/>
            <div id="coin-symbol-vert">
              <h1>{coin.symbol}</h1>
            </div>
            <CoinSelection 
              coins={coins} 
              index={index}
              setIndex={this.props.setIndex}
            />
          </div>
          <div id="card-right" className="card-half">
            <div id="card-right-contents">
              <div id="coin-header">
                <div id="coin-name">
                  <h1>{coin.name}</h1>
                </div>
                <div id="coin-symbol">
                  <h1>{coin.symbol}</h1>
                </div>
                <div id="coin-rank">
                  <div className="label">
                    <h1>Rank</h1>
                  </div>
                  <div className="value">
                    <h1>{coin.rank}</h1>
                  </div>
                </div>
              </div>
              <div id="coin-price">
                <div className="value">
                  <h1>${coin.price}</h1>
                </div>
                <div id="coin-change-24hr" className={this.determineSign(coin.change24hr)}>
                  <h1>{coin.change24hr}%</h1>
                </div>
              </div>
              <div id="coin-info">
                <CoinInfoField value={`$${coin.cap}`} label={"Market Cap"}/>
                <CoinInfoField value={`$${coin.volume}`} label={"Volume"}/>
                <CoinInfoField value={`${coin.circulating} ${coin.symbol}`} label={"Circulating Supply"}/>
              </div>
              <div id="card-right-stripes"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const CoinInfoField = ({
  value,
  label
}) => {
  return(
    <div className="coin-info-field">
      <div className="value">
        <h1>{value}</h1>
      </div>
      <div className="label">
        <h1>{label}</h1>
      </div>
    </div>
  )
}

class CoinSelection extends React.Component {
  constructor(props){
    super(props)
    this.setCurrentScrollTop = this.setCurrentScrollTop.bind(this)
    this.moveScrollTop = this.moveScrollTop.bind(this)
    this.onOptionsScroll = this.onOptionsScroll.bind(this)
    this.state = {
      currentScrollTop: 0
    }
  }
  setCurrentScrollTop(val){
    this.setState({currentScrollTop: val})
  }
  moveScrollTop(){
    this.refs.coinOptions.scrollTop = this.state.currentScrollTop
  }
  onOptionsScroll(){
    const option = document.getElementsByClassName('coin-option')[0],
          topOffset = window.innerHeight / 2,
          optionHeight = option.clientHeight,
          scrollTop = this.refs.coinOptions.scrollTop,
          newScrollTop = this.props.index * (optionHeight + 20),
          index = Math.max(1, Math.ceil(scrollTop / optionHeight))
    this.setCurrentScrollTop(newScrollTop)
    this.props.setIndex(index - 1)
  }
  render(){
    const coinOptions = this.props.coins.slice(0,10).map(coin => {
      const selected = this.props.index == coin.rank - 1
      return(
        <div key={coin.symbol} className={`coin-option ${selected ? 'selected' : ''}`}>
          <div className={'coin-option-icon'} style={{backgroundImage: `url(${coin.img})`}}/>
        </div>
      )
    })
    return(
      <div id="coin-selection" onMouseLeave={this.moveScrollTop}>
        <div id="coin-options-wrapper" 
          ref="coinOptions"
          className="scroll-bar"
          onScroll={this.onOptionsScroll}
        >
          <div id="coin-options">
            {coinOptions}
          </div>
        </div>
      </div>
    )
  }
}

const formatNum = num => {
  const splitNum = num.split('.'),
        firstHalf = splitNum[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        secondHalf = splitNum[1] ? splitNum[1].substring(0, 2) : splitNum[1]

  return secondHalf ? `${firstHalf}.${secondHalf}` : firstHalf
}

const getColorClass = color => {
  if (!color) return 'orange'
  switch(color){
    case 'ORANGE':
      return 'orange'
      break
    case 'BLUE':
      return 'blue'
      break
    case 'GREEN':
      return 'green'
      break
    case 'GRAY':
      return 'gray'
      break
    default:
        break
  }
  return 'orange'
}

const particlesConfig = {
  "particles": {
    "number": {
      "value": 30
    },
    "color": {
      "value": "#607d8b"
    },
    "size": {
      "value": 2
    },
    "line_linked": {
      "enable": true,
      "distance": 350,
      "color": "#607d8b"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false
      }
    },
    "modes": {
      "grab": {
        "distance": 500,
        "line_linked": {
          "opacity": 1
        }
      }
    }
  }
}