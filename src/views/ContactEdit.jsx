import { Component } from 'react'
import { contactService } from '../services/contact.service'

export class ContactEdit extends Component {
	state = {
		contact: contactService.getEmptyContact(),
	}

	async componentDidMount() {
		const contactId = this.props.match.params.id
		if (contactId) {
			try {
				const contact = await contactService.getContactById(contactId)
				this.setState({ contact })
			} catch (error) {
				console.log('error:', error)
			}
		}
	}

	onSaveContact = async (ev) => {
		ev.preventDefault()
		try {
			await contactService.saveContact({ ...this.state.contact })
			this.onBack()
		} catch (error) {
			console.log('error:', error)
		}
	}

	handleChange = ({ target }) => {
		const field = target.name
		let value = target.value
		switch (target.type) {
			case 'number':
			case 'range':
				value = +value
				break
			case 'checkbox':
				value = target.checked
				break
		}
		this.setState(({ contact }) => ({ contact: { ...contact, [field]: value } }))
	}

  onBack = () => {
    if (this.state.contact._id) {
      this.props.history.push(`/contact/${this.state.contact._id}`)
      return
    }
    this.props.history.push('/contact')
  }

  onRemoveContact = async () => {
      try {
          const contactId = this.state.contact._id
          await contactService.deleteContact(contactId)
          this.props.history.push('/contact')
      } catch (err) {
          console.error('error:', err)
      }
  }

	render() {
    	const { contact } = this.state
		const { name, phone, email } = contact
		return (
			<section className="contact-edit">
			<button onClick={this.onBack}>Back</button>
			<button onClick={this.onRemoveContact}>Delete</button>
				<h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
                	{contact._id && <img src={`https://robohash.org/${contact._id}?set=set5`}  />}
				<form onSubmit={this.onSaveContact}>
					<section>
					<label htmlFor="name">Name</label>
					<input value={name} onChange={this.handleChange} type="text" name="name" id="name" />
					</section>
					<section>
					<label htmlFor="phone">Phone</label>
					<input value={phone} onChange={this.handleChange} type="phone" name="phone" id="phone" />
					</section>
					<section>
					<label htmlFor="email">Email</label>
					<input value={email} onChange={this.handleChange} type="email" name="email" id="email" />
					</section>
					<section className='flex auto-center'>
					<button>Save</button>
					</section>
				</form>
			</section>
		)
	}
}