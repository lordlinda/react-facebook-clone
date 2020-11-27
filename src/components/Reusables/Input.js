import React from 'react'
import './Input.css'

function Input({ name, type, value, onChange }) {
    return (
        <div className='input'>
            <label>{name}:</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className='input__form'
            />
        </div>
    )
}

export default Input
