import React, { Component } from 'react'
import { CryptoDashboard } from '../cmps/CryptoDashboard'
import { AdvancedCharting } from '../cmps/AdvancedCharting'

export class StatisticPage extends Component {

    render() {
        return (
            <>
                <CryptoDashboard />
                <AdvancedCharting />
            </>
        )
    }
}
