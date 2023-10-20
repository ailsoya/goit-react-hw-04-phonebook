import { useState, useEffect } from "react"
import { ContactForm } from './Elements/ContactForm'
import { ContactList } from './Elements/ContactList'
import { Filter } from './Elements/Filter'

export const App = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const current = localStorage.getItem('contacts')
    setContacts(JSON.parse(current))
  }, [])

  const handleChange = evt => {
    const { value } = evt.target
    setFilter(value)
  }

  const handleSubmit = newContact => {
    let copy = Object.assign([], contacts)

    const nameInContacs = copy.some(contact =>
      contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    )

    if(nameInContacs) {
      alert(`${newContact.name} is already in contacts`)
    } else {
      copy.push(newContact)
      setContacts(copy)
    }
  }

  const contactDelete = id => {
    let copy = Object.assign([], contacts)
    const index = copy.findIndex(n => n.id === id)

    if (index !== -1) {
      copy.splice(index, 1)
    }

    setContacts(copy)
  }

  useEffect(() => {
    if(Object.keys(contacts).length > 0) { localStorage.setItem('contacts', JSON.stringify(contacts)) }
  }, [contacts])

  const filterContacts = () => {
    if(filter!=='') {
      let normFilter = filter.toLowerCase()
      const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normFilter)
      )
      return filteredContacts
    } else {
      return contacts
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter onChange={handleChange} value={filter} />
      <ContactList contacts={filterContacts()} onClick={contactDelete} />
    </div>
  )
}