import { userService } from '../services/user.service'
import { cryptoService } from '../services/crypto.service'
import { CryptoDetails } from '../cmps/CryptoDetails'
import AtomLoader from '../cmps/AtomLoader'
import { SvgIcon } from '../cmps/SvgIcon'
import React, { Component } from 'react'
import { LoginSignup } from './LoginSignup'
import Particles from 'react-particles'
import { MovesList } from '../cmps/MovesList'
import { MovePreview } from '../cmps/MovePreview'

export class Home extends Component {
    state = {
        user: null,
        coins: null,
        animatedName: null,
        letters: 'abcdefghijklmnopqrstuvwxyz',
    }

    async componentDidMount() {
        try {
            const user = userService.getUser()
            const coins = await cryptoService.getRate(user.coins)
            this.setState({ coins, user, animatedName: user.name },()=>this.animateName())
        } catch (error) {
            console.log('error:', error)
        }
    }

    setCoins = async () => {
        const coins = await cryptoService.getRate(this.state.user.coins)
        this.setState({ coins })
    }

    animateName = () => {
        let { animatedName } = this.state
        const iterations = 4
        for (let i = 0; i < animatedName.length; i++) {
            for (let j = iterations; j > 0; j--) {
                setTimeout(() => {
                    let currWord = animatedName
                    .split('')
                    .map((letter, idx) => {
                        if (idx <= j) {
                            return animatedName[idx]
                        }
                        return this.state.letters[Math.floor(Math.random() * 26)]
                    })
                    .join('')
                    if (i === animatedName.length-1) currWord = this.state.user.name
                    this.setState({ animatedName: currWord })
                }, i*j*30)
            }
        }
    }
    get particleStyles() {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
        }
    }
    get particlesConfig() {
        return { 
            particles: {
                number: {
                value: 50,
                },
                size: {
                value: 3,
                },
            },
            interactivity: {
                events: {
                onhover: {
                    enable: true,
                    mode: 'repulse',
                },
                },
            }
        }
    }
    render() {
        const { user, coins, animatedName } = this.state
        if (!user || !coins) return <AtomLoader />
        const {moves} = user
        const MOVES_NUMBER = 10
        return (
            <>
                <Particles style={this.particleStyles} params={this.particlesConfig} />
                <div className='home'>
                    <div className="screen">  
                        <div className="screen-image"></div>  
                        <div className="screen-overlay"></div>  
                        <div className="screen-content">
                            <div className="screen-user"></div>
                        </div>
                        <div className="content">
                            <h1>Welcome {animatedName}!</h1>
                            <h2>Current Balance:</h2>
                            <h3><SvgIcon iconName="dollar" />{user.coins}</h3>
                            <h3><SvgIcon iconName="bitCoin" />{coins}</h3>
                            {moves && moves.length > 0 &&
                            <MovesList title={`Your`} number={moves.length > MOVES_NUMBER ? MOVES_NUMBER : moves.length} moves={moves}>
                                {moves.slice(0, MOVES_NUMBER).map(move => {
                                    return <MovePreview key={move.at} move={move} />
                                })}
                            </MovesList>}
                        </div>
                    </div>
                    {/* <CryptoDetails /> */}
                </div>
            </>
        )
    }
}

