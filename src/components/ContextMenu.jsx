import React from 'react'

export default function ContextMenu({menuPosition , SetMenuPosition , setExpenses , rowId}) {
  if (!menuPosition || typeof menuPosition.left === 'undefined') {
    return null;
  }
  return (
    <>
    <div className="context-menu" style={{...menuPosition}}>
      <div onClick={() => {
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
