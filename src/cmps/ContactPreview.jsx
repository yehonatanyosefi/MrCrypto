import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact, onRemoveContact }) {
    return (
        <Link to={`/contact/${contact._id}`}>
            <li className='contact-preview'>
                    <section className="info">
                        <img src={`https://robohash.org/${contact._id}?set=set5`} alt="Profile Image" className='avatar' />
                        <h2>{contact.name}</h2>
                    </section>
                <button onClick={(ev) => onRemoveContact(ev,contact._id)}>X</button>
            </li>
        </Link>
    )
}
