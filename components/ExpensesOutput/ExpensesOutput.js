import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'
import { GlobalStyle } from '../../constants/styles'

const DUMMY_EXPENSES=[
  {
    id:"e1",
    description:"a pair of shoes",
    amount:59.99,
    date: new Date("2021-12-19")
  },
  {
    id:"e2",
    description:"a pair of trowsers",
    amount:89.99,
    date: new Date("2022-01-19")
  },
  {
    id:"e3",
    description:"Some fruits",
    amount:9.09,
    date: new Date("2022-07-08")
  },
  {
    id:"e4",
    description:"Some vegetables",
    amount:11.09,
    date: new Date("2022-08-08")
  },
  {
    id:"e5",
    description:"Some juices",
    amount:5.10,
    date: new Date("2022-08-10")
  },
  {
    id:"e11",
    description:"a pair of shoes",
    amount:59.99,
    date: new Date("2021-12-19")
  },
  {
    id:"e12",
    description:"a pair of trowsers",
    amount:89.99,
    date: new Date("2022-01-19")
  },
  {
    id:"e13",
    description:"Some fruits",
    amount:9.09,
    date: new Date("2022-07-08")
  },
  {
    id:"e14",
    description:"Some vegetables",
    amount:11.09,
    date: new Date("2022-08-08")
  },
  {
    id:"e15",
    description:"Some juices",
    amount:5.10,
    date: new Date("2022-08-10")
  },
]

const ExpensesOutput = ({expenses, expensesPeriod}) => {
  return (
    <View style={styles.container}>
        <ExpensesSummary expenses={DUMMY_EXPENSES} 
        periodName={expensesPeriod} />
        <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:24,
    paddingTop:24,
    paddingBottom:0,
    backgroundColor:GlobalStyle.colors.primary700,
    flex:1,
  }
})