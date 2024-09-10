import './App.css'
import ContextMenu from './components/ContextMenu'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import expenseData from './expenseData'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
   const[expenses , setExpenses] = useLocalStorage('expenses',expenseData)
   const [expense , setExpense] = useLocalStorage('' , {
    title: '',
    category: '',
    amount:''
  })
  const [editingRowId , setEditingRowId] = useLocalStorage('editingRowId', '')
  return (
    <>
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm 
          expense={expense}
          setExpense={setExpense}
          setExpenses={setExpenses}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
        />
        <ExpenseTable 
          setExpense={setExpense} 
          expenses={expenses} 
          setExpenses={setExpenses}
          setEditingRowId={setEditingRowId}
        />
        <ContextMenu/>
      </div>
    </main>
    </>
  )
}

export default App
