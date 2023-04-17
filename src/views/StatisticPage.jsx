import React, { Component } from 'react'
import { Sparklines, SparklinesBars } from 'react-sparklines'
import { cryptoService } from '../services/crypto.service'
import AtomLoader from '../cmps/AtomLoader'

export class StatisticPage extends Component {
    state = {
        data: null,
    }

    async componentDidMount() {
        this.setMarketPrice()
    }

    setMarketPrice = async () => {
        try {
            this.setState({ data: null })
            const marketPrices = await cryptoService.getMarketPrice()
            const marketPrice = marketPrices.values.map(value => value.y)
            this.setState({ data: marketPrice })
        } catch (err) {
            console.error('error from getting market price:', err)
            return null
        }
    }

    setConfirmedTransactions = async () => {
        try {
            const confirmedTransactions = await cryptoService.getConfirmedTransactions()
            const blockSize = confirmedTransactions.values.map(value => value.y)
            this.setState({ data: blockSize })
        } catch (err) {
            console.error('error from getting market price:', err)
            return null
        }
    }

    handleRouteChange = ({ target }) => {
        const dataType = target.value
        if (dataType === 'marketPrice') this.setMarketPrice()
        else if (dataType === 'blockSize') this.setConfirmedTransactions()
    }

    render() {

        // const { title, data, description, color } = this.props
        const { routeList, data, currRoute } = this.state
        if (!data) return <AtomLoader />
        return (
            <>
                <div className='routes'>
                    <select onChange={this.handleRouteChange}>
                        <option value="marketPrice">Market Price</option>
                        <option value="blockSize">Block Size</option>
                    </select>
                </div>
                <Sparklines data={data.slice(0, 49)}>
                    <SparklinesBars />
                </Sparklines>
            </>
        )
    }
}
