import React, { Component } from 'react'

export class ContactFilter extends Component {

    state = {
        filterBy: null
    }

    componentDidMount() {
        this.setState({ filterBy: { ...this.props.filterBy } })
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
            default:
                break
        }
        this.setState(
            ({ filterBy }) => ({ filterBy: { ...filterBy, [field]: value } }),
            () => this.props.onChangeFilter(this.state.filterBy)
        )

    }

    render() { //todo: run the sections with a map
        if (!this.state.filterBy) return <div>Loading...</div>
        const { name, email, phone } = this.state.filterBy
        return (
            <form className='contact-filter'>
                <section>
                    <label htmlFor="name">Name</label>
                    <input onChange={this.handleChange} value={name} type="search" name="name" id="name" />
                </section>
                <section>
                    <label htmlFor="email">Email</label>
                    <input onChange={this.handleChange} value={email} type="search" name="email" id="email" />
                </section>
                <section>
                    <label htmlFor="phone">Phone</label>
                    <input onChange={this.handleChange} value={phone} type="search" name="phone" id="phone" />
                </section>
            </form>
        )
    }
}
