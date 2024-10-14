import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import IconButton from '../UI/IconButton';
import { GlobalStyle } from '../constants/styles';
import Button from '../UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

const ManageExpense = ({route, navigation}) => {

  const expensesCtx =useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId;

  const deleteExpenseHandler = () =>{
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }
  const cancelHandler = ()=>{
    navigation.goBack()
  }
  const confirmHandler = ()=>{
    if(isEditing){
      expensesCtx.updateExpense(editedExpenseId,{
        description:"test11111", 
        amount:29.99,
        date:new Date("2024-10-03"),
      })
    }
    else{
      expensesCtx.addExpense({
        description:"test", 
        amount:19.99,
        date:new Date("2024-10-02"),
      })
    }
    navigation.goBack()
  }


  useLayoutEffect(()=>{
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  },[navigation, isEditing])

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} 
        onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}</Button>
      </View>
      {isEditing &&( 
        <View style={styles.deleteContainer}> 
          <IconButton icon="trash" 
      color={GlobalStyle.colors.error500} size={36} onPress={deleteExpenseHandler} 
      /> 
      </View>) }
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:GlobalStyle.colors.primary700,
  },
  deleteContainer:{
    marginTop:16,
    paddingTop:8,
    borderTopWidth:2,
    borderTopColor:GlobalStyle.colors.primary200,
    alignItems:"center"
  },
  buttons:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  button:{
    minWidth:120,
    marginHorizontal:8
  }
})