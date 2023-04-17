import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { Link } from 'react-router-dom'
import AtomLoader from '../cmps/AtomLoader'
import { TransferFunds } from '../cmps/TransferFunds'
import { MovesList } from '../cmps/MovesList'
import { MovePreview } from '../cmps/MovePreview'
import { userService } from '../services/user.service'

export class ContactDetails extends Component {

    state = {
        contact: null,
        user: null,
    }

    
    async componentDidMount() {
        const user = userService.getUser()
        this.setState({ user })
        this.loadContact()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()
        }
    }

    loadContact = async () => {
        try {
            const contact = await contactService.getContactById(this.props.match.params.id)
            this.setState({ contact })
        } catch (error) {
            console.error('error:', error)
        }
    }

    onTransferCoins = async (amount) => {
        try {
            const user = await userService.addMove(this.state.contact, amount)
            this.setState({ user })
        } catch (error) {
            console.error('error:', error)
        }
    }

    onBack = () => {
        this.props.history.push('/contact')
    }

    render() {
        const { contact, user } = this.state
        if (!contact || !user) return <AtomLoader />
        const { name, email, phone, _id } = contact
        const { moves, coins } = user
        const movesToContact = moves.filter(move => move.toId === _id)
        const MOVES_NUMBER = 3
        return (
            <section className='contact-details'>
                <button onClick={this.onBack}>Back</button>
                <div className='contact-profile'>
                <h3>Name: {name}</h3>
                <h3>Email: {email}</h3>
                <h3>Phone: {phone}</h3>
                <img src={`https://robohash.org/${_id}?set=set5`}  />
                </div>
                <Link to={`/contact/edit/${_id}`}>Edit</Link>
            <TransferFunds maxCoins={coins} onTransferCoins={this.onTransferCoins} />
            {movesToContact && movesToContact.length > 0 &&
            <MovesList title={`Your`} number={movesToContact.length > MOVES_NUMBER ? MOVES_NUMBER : movesToContact.length} moves={movesToContact}>
                {movesToContact.slice(0, MOVES_NUMBER).map(move => {
                    return <MovePreview key={move.at} move={move} />
                })}
            </MovesList>}
            </section>
        )
    }
}
