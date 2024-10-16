import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'
import LoadingOverlay from '../UI/LoadingOverlay'
import ErrorOverlay from '../UI/ErrorOverlay'

const RecentExpense = () => {
  const expensesCtx=useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()
  // const [fetchedExpenses, setFetchedExpenses]=useState([])

  useEffect(()=>{
    const getExpenses=async()=>{
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError("Could not fetch expenses!")
      }
      setIsFetching(false)
    }
    getExpenses()
  },[])

  const recentExpenses = expensesCtx.expenses.filter(
    (expense)=>{
      const today = new Date()
      const date7DaysAgo = getDateMinusDays(today, 7);
      // console.log(today+" 7days: "+date7DaysAgo+" expenseDate: "+expense.date)
      // console.log((expense.date > date7DaysAgo) && (expense.date<=today)? "true" : "false")
      return (expense.date > date7DaysAgo) && (expense.date<=today)
    })

    

    if(error && !isFetching)
    {
      return <ErrorOverlay message={error} />
    }

    if(isFetching)
    {
      return <LoadingOverlay />
    }

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered in last 7 days" />
  )
}

export default RecentExpense