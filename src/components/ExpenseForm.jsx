import React, { useState } from 'react'
import Input from './Input';
import Select from './Select';

export default function ExpenseForm({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId
}) {
  const [errors , setErrors] = useState({});
  const validateConfig = {
    title: [
      { required: true, message: 'Title is required!' },
      { minlength: 3, message: 'Should be at least 3 characters' },
    ],
    category: [{ required: true, message: 'Category is required!' }],
    amount: [
      { required: true, message: 'Amount is required!'},
      { pattern: /^[1-9]\d*(\.\d+)?$/, message: 'Enter valid number.'}
    ],
  };

  const validate = (FormData) => {
    const errorsData = {}
    Object.entries(FormData).forEach(([key,value]) => {
        validateConfig[key].forEach((rule) => {
          if(rule.required && !value){
            errorsData[key] = rule.message;
            return true;
          }
          if(rule.minlength && value.length < rule.minlength){
            errorsData[key] = rule.message;
            return true;
          }
          if(rule.pattern && !rule.pattern.test(value)){
            errorsData[key] = rule.message;
            return true;
          }
        }) 
    })
    setErrors(errorsData);
    return errorsData;
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents the page from reloading when add button is clicked
    const validationResult = validate(expense); 
    if(Object.keys(validationResult).length){ // object.keys will make sure that empty values wouldnt be added in the table.
      return
    }

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId }
          }
          return prevExpense
        })
      )
      setExpense({
        title: '',
        category: '',
        amount: '',
      })
      setEditingRowId('')
      return
    }

    setExpenses((prevState) =>
      [...prevState,{...expense, 
        id:crypto.randomUUID()}
      ]);
    
    setExpense({
      title: '',
      category: '',
      amount: '',
    })

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
        <Input 
          label='Title' 
          id='title' 
          name='title' 
          value={expense.title} 
          onChange={handleChange} 
          error={errors.title}
        />

        <Select
          label='Category'
          id='category' 
          name='category' 
          value={expense.category} 
          onChange={handleChange}
          error={errors.category}
          options={['Grocery', 'Clothes', 'Bills', 'Education', 'Medicine']}
        />  

        <Input 
          label='Amount' 
          id='amount' 
          name='amount' 
          value={expense.amount} 
          onChange={handleChange} 
          error={errors.amount}
        />
        <button className="add-btn">{editingRowId? 'Save' : 'Add'}</button>
    </form>
    </>
  )
}
