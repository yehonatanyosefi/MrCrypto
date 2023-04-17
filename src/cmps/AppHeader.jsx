import React from 'react'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className="app-header">
            <section className="container">
                  <NavLink exact to="/">
                    <div className='full-logo'>
                      <img src={require('../assets/imgs/mr_crypto.png')} alt="mr crypto logo" className='logo' />
                      Mr Crypto
                    </div>
                  </NavLink>
                  <nav className='routes'>
                      <NavLink exact to="/">Home</NavLink>
                      <NavLink to="/contact">Contacts</NavLink>
                      <NavLink to="/statistic">Statistics</NavLink>
                      <NavLink to="/loginSignup">Signup</NavLink>
                  </nav>
            </section>
     </header>
  )
}