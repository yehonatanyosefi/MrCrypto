import React, { useState, useEffect } from 'react'
import AtomLoader from './AtomLoader'

export function ContactFilter({ filterBy: initialFilterBy, onChangeFilter }) {
  const [filterBy, setFilterBy] = useState(null)

  useEffect(() => {
    setFilterBy({ ...initialFilterBy })
  }, [initialFilterBy])

  const handleChange = ({ target }) => {
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

    const newFilterBy = { ...filterBy, [field]: value }
    onChangeFilter(newFilterBy)
  }

  if (!filterBy) return <AtomLoader />
  const { name, email, phone } = filterBy
  return (
            <form className='contact-filter'>
                <section>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} value={name} type="search" name="name" id="name" />
                </section>
                <section>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} value={email} type="search" name="email" id="email" />
                </section>
                <section>
                    <label htmlFor="phone">Phone</label>
                    <input onChange={handleChange} value={phone} type="search" name="phone" id="phone" />
                </section>
            </form>
        )
}
