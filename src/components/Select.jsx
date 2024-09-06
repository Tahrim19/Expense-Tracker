import React from 'react'

export default function Select({id,label,name,value,onChange,error,options}) {
  return (
    <div className="input-container">
        <label htmlFor={id}>{label}</label>
        <select 
          id={id}
          name={name}
          value={value} 
          onChange={onChange}
        >   
          <option value="" hidden>Select category</option>
          {options.map((option ,i)=> 
            <option key={i} value={option}>{option}</option>
          )}
        </select>
        <p className='error'>{error}</p>
    </div>
  )
}
