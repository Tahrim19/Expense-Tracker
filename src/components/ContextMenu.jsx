import React from 'react'

export default function ContextMenu({
  menuPosition,
  SetMenuPosition,
  setExpenses,
  rowId, 
  setExpense,
  expenses,
  setEditingRowId
}) {
  if (!menuPosition || typeof menuPosition.left === 'undefined') {
    return null;
  }
  return (
    <>
    <div className="context-menu" style={{...menuPosition}}>
      <div onClick={() => {
        setEditingRowId(rowId)
        const {title,category,amount} = expenses.find((expense) => expense.id === rowId)
        setExpense({title,category,amount})
        SetMenuPosition({});
      }}
      >
        Edit</div>
      <div onClick={() => {
        setExpenses((prevState) => prevState.filter(expense => expense.id !== rowId))
        SetMenuPosition({});
      }}
      >
      Delete</div>
    </div>
    </>
  )
}
