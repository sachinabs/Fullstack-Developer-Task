import React from 'react'

const InputField = ({name,value,onChange}) => {
    return (
        <div>
            <label>
          {name}
          <input type="text" value={value} onChange={(e)=>onChange(e)} />
        </label>
        </div>
    )
}

export default InputField
