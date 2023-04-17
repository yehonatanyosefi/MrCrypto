import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import './assets/scss/main.scss'
import { Home } from './views/Home'
import { ContactIndex } from './views/ContactIndex'
import { StatisticPage } from './views/StatisticPage'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'
import { AppHeader } from './cmps/AppHeader'
import { LoginSignup } from './views/LoginSignup'

// function MainContent({ route, ...restOfProps }) {
//     switch (route) {
//         case 'Home':
//             return <Home props={restOfProps} />
//         case 'Contacts':
//             return <ContactIndex props={restOfProps} />
//         case 'Chart':
//             return <StatisticPage props={restOfProps} />
//     }
// }
import React from 'react'

export default function App() {
    return (
        <Router>
            <section className="main-app">
                <AppHeader />
                <main className="container">
                    <Switch>
                        <Route path="/contact/edit/:id?" component={ContactEdit} />
                        <Route path="/contact/:id" component={ContactDetails} />
                        <Route path="/contact" component={ContactIndex} />
                        <Route path="/statistic" component={StatisticPage} />
                        <Route path="/loginSignup" component={LoginSignup} />
                        <Route path="/" component={Home} />
                    </Switch>
                </main>
            </section>
        </Router>
    )
}