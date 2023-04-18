import { cryptoService } from '../services/crypto.service'
import AtomLoader from '../cmps/AtomLoader'
import { SvgIcon } from '../cmps/SvgIcon'
import { MovesList } from '../cmps/MovesList'
import { MovePreview } from '../cmps/MovePreview'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { loadUser } from '../store/actions/user.actions'

export function Home() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [ BTC, setBTC ] = useState(null)
    const [ animatedName, setAnimatedName ] = useState(null)
    const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
    const MOVES_NUMBER = 10
    const dispatch = useDispatch()
    const isFirstRender = useRef(true)

    useEffect(() => {
        dispatch(loadUser())
        return (()=>{
            isFirstRender.current = true
        })
    }, [])

    useEffect(() => {
        if (!loggedInUser) return
        fetchBTC()
        setAnimatedName(loggedInUser.name)
        isFirstRender.current = false
    }, [loggedInUser])

    useEffect(()=>{
        if (isFirstRender.current) return
        animateName()
        isFirstRender.current = true
    },[animatedName])

    async function fetchBTC() {
        try {
            const updatedBTC = await cryptoService.getRate(loggedInUser.coins)
            setBTC(updatedBTC)
        } catch (err) {
            console.log('error:', err)
        }
    }

    function animateName() {
        if (!loggedInUser?.name || !animatedName) return
        const iterations = 4
        for (let i = 0; i < loggedInUser?.name?.length; i++) {
            for (let j = iterations; j > 0; j--) {
                setTimeout(() => {
                    let currWord = animatedName
                    .split('')
                    .map((letter, idx) => {
                        if (idx <= j) {
                            return animatedName[idx]
                        }
                        return LETTERS[Math.floor(Math.random() * 26)]
                    })
                    .join('')
                    if (i === animatedName.length-1) currWord = loggedInUser.name
                    setAnimatedName(currWord)
                }, i*j*30)
            }
        }
    }
    
        if (!loggedInUser || !BTC) return <AtomLoader />
        const {moves} = loggedInUser
        return (
            <>
                <div className="home">
                    <div className="screen">  
                        <div className="screen-image"></div>  
                        <div className="screen-overlay"></div>  
                        <div className="screen-content">
                            <div className="screen-user"></div>
                        </div>
                        <div className="content">
                            <h1>Welcome {animatedName}!</h1>
                            <h2>Current Balance:</h2>
                            <h3><SvgIcon iconName="dollar" />{loggedInUser.coins}</h3>
                            <h3><SvgIcon iconName="bitCoin" />{BTC}</h3>
                            {moves && moves.length > 0 &&
                            <MovesList
                                title={`Your`}
                                number={moves.length > MOVES_NUMBER ? MOVES_NUMBER : moves.length}
                                moves={moves}>
                                {moves.slice(0, MOVES_NUMBER).map(move => {
                                    return <MovePreview key={move.at} move={move} />
                                })}
                            </MovesList>}
                        </div>
                    </div>
                </div>
            </>
        )
}

