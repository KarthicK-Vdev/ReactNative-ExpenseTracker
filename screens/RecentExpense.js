import { View, Text } from 'react-native'
import React from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

const RecentExpense = () => {
  return (
    <ExpensesOutput expensesPeriod="Last 7 Days" />
  )
}

export default RecentExpense