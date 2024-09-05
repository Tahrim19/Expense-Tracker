import React, { useState } from 'react'

export default function ExpenseForm({setExpenses}) {
  const [expense , setExpense] = useState({
    title: '',
    category: '',
    amount:''
  })

  const [errors , setErrors] = useState({});
  const validate = (FormData) => {
    const errorsData = {};
    if(!FormData.title){
      errorsData.title = 'Title is required!';
    }

    if(!FormData.category){
      errorsData.category = 'Category is required!';
    }

    if(!FormData.amount){
      errorsData.amount = 'Amount is required!';
    }

    setErrors(errorsData);
    return errorsData;
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents the page from reloading when add button is clicked
    const validationResult = validate(expense); 
    if(Object.keys(validationResult).length){ // object.keys will make sure that empty values wouldnt be added in the table.
      return
    }
    setExpenses((prevState) =>
      [...prevState,{...expense, 
        id:crypto.randomUUID()}
      ]);

  }

  const handleChange = (e) => {
    const {name , value} = e.target;
     setExpense((prevState) =>
      ({...prevState, 
        [name]: value,}))
    setErrors[{}]
  }

  return (
    <>
    <form className="expense-form" onSubmit={handleSubmit}>
        <div className="input-container">
            <label htmlFor="title">Title</label>
            <input 
              id="title" 
              name='title' 
              value={expense.title} 
              onChange={handleChange}
            />
            <p className='error'>{errors.title}</p>
        </div>
        <div className="input-container">
            <label htmlFor="category">Category</label>
            <select 
              id='category' 
              name='category' 
              value={expense.category} 
              onChange={handleChange}
            >   
                <option value="" hidden>Select category</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothes">Clothes</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Medicine">Medicine</option>
            </select>
            <p className='error'>{errors.category}</p>
        </div>
        <div className="input-container">
            <label htmlFor="amount">Amount</label>
            <input 
              id="amount" 
              name='amount'
              value={expense.amount} 
              onChange={handleChange}
            />
            <p className='error'>{errors.amount}</p>
        </div>
        <button className="add-btn">Add</button>
    </form>
    </>
  )
}
