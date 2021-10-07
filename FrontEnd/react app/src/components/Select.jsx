import { on } from 'events'
import React from 'react'

const Select = ({name,options, onChange}) => {
    return (
        <div>
            <label>
                {name}
            <select name={name} onChange={(e)=> onChange(e)}>
                {options.map(option=>
                <option>{option}</option>
                    )}
                
            </select>
           </label>
        </div>
    )
}

export default Select
