import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStyle } from '../constants/styles'
import { fetchExpenses } from '../util/http';
import { ExpensesContext } from '../store/expenses-context';
import ErrorOverlay from '../UI/ErrorOverlay';
import LoadingOverlay from '../UI/LoadingOverlay';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const Report = () => {
    const today = new Date();
    const expensesCtx=useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

    const [month, setMonth]=useState(today.getMonth())
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
    const monthlyExpenses=expensesCtx.expenses.filter((expense)=>{
        return expense.date.getMonth()===month;
    })
    console.log(monthlyExpenses)
    if(error && !isFetching)
        {
          return <ErrorOverlay message={error} />
        }
    
        if(isFetching)
        {
          return <LoadingOverlay />
        }
  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={monthlyExpenses} expensesPeriod=" This month" fallbackText="No expenses registered in this month" />
    </View>
  )
}

export default Report

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:GlobalStyle.colors.primary700
    }
})