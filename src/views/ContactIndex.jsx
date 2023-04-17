import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContactList'
import { ContactPreview } from "../cmps/ContactPreview";
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'
import AtomLoader from '../cmps/AtomLoader'

export class ContactIndex extends Component {

    state = {
        contacts: null,
        filterBy: {
            name: '',
            email: '',
            phone: '',
        }
    }

    componentDidMount() {
        this.loadContacts()
    }

    loadContacts = async () => {
        try {
            const contacts = await contactService.getContacts(this.state.filterBy)
            this.setState({ contacts })
        } catch (err) {
            console.error('err:', err)
        }
    }

    onRemoveContact = async (ev,contactId) => {
        ev.preventDefault()
        try {
            await contactService.deleteContact(contactId)
            this.setState(({ contacts }) => ({
                contacts: contacts.filter(contact => contact._id !== contactId)
            }))
        } catch (err) {
            console.error('error:', err)
        }
    }

    onChangeFilter = (filterBy) => {
        this.setState({ filterBy: { ...filterBy } }, this.loadContacts)
    }

    render() {
        const { contacts, filterBy } = this.state
        if (!contacts) return <AtomLoader />
        return (
            <section className='contact-index'>
                <Link to="/contact/edit" className='add-contact'>+</Link>
                <ContactFilter filterBy={filterBy} onChangeFilter={this.onChangeFilter} />
                <ContactList>
                    {contacts.map(contact =>
                        <ContactPreview key={contact._id} contact={contact} onRemoveContact={this.onRemoveContact} />
                    )}
                </ContactList>
            </section>
        )
    }
}
