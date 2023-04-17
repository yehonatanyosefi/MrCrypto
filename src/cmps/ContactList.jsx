export function ContactList({ children, ...restOfProps }) {
    return (
        <ul className="contact-list simple-cards-grid">
            { children }
        </ul>
    )
}
