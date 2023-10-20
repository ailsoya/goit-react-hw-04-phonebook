import styles from "../Style.module.css"
import { useState } from 'react'
import { nanoid } from 'nanoid'

export const ContactForm = (props) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const handleChange = (evt) => {
        const { name, value } = evt.target
        if(name==='name') {
            setName(value)
        } else {
            setNumber(value)
        }
    }

    const prepareToSubmit = (evt) => {
        const id = nanoid()
        evt.preventDefault()
        props.onSubmit({ id, name, number })
        setName('')
        setNumber('')

    }

    return (
        <form onSubmit={evt => prepareToSubmit(evt)} className={styles.Form}>
            <label className={styles.Label}>
                Name
                <input value={name} onChange={evt => handleChange(evt)} type="text" name="name" required />
            </label>
            <label className={styles.Label}>
                Number
                <input value={number} onChange={evt => handleChange(evt)} type="tel" name="number" required />
            </label>
            <button type='submit' className={styles.SubmitButton}>Add contact</button>
        </form>
    )
}