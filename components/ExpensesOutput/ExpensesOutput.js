import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'

const ExpensesOutput = ({expenses, expensesPeriod}) => {
  return (
    <View>
        <ExpensesSummary expenses={expenses} 
        periodName={expensesPeriod} />
        <ExpensesList />
    </View>
  )
}

export default ExpensesOutput