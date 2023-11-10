import React from 'react'
import style from './Input.module.css'

function Input(props) {
  return (
    <div
          className={`${style.control} ${
            props.isValid === false ? style.invalid : ""
          }`}
        >
          <input
            value={props.value}
            onChange={props.onChange}
            id={props.id}
            type={props.type}
            placeholder={props.id}
          />
        </div>
  )
}

export default Input
