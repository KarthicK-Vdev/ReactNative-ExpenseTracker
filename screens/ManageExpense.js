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

  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId )

  const deleteExpenseHandler = () =>{
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }
  const cancelHandler = ()=>{
    navigation.goBack()
  }
  const confirmHandler = (expenseData)=>{
    if(isEditing){
      expensesCtx.updateExpense(editedExpenseId, expenseData)
    }
    else{
      expensesCtx.addExpense(expenseData)
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
      <ExpenseForm 
      submitButtonLabel={isEditing ? "Update" : "Add"}
      onCancel={cancelHandler} 
      onSubmit={confirmHandler}
      defaultValues={selectedExpense}
      />
      
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
  
})