import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import IconButton from '../UI/IconButton';
import { GlobalStyle } from '../constants/styles';
import Button from '../UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

const ManageExpense = ({route, navigation}) => {

  const expensesCtx =useContext(ExpensesContext)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId )

  const deleteExpenseHandler = async() =>{
    setIsSubmitting(true)
    try {
      await deleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError("Could not delete expense- please try again later")
      setIsSubmitting(false)
    }
  }
  const cancelHandler = ()=>{
    navigation.goBack()
  }
  const confirmHandler = async(expenseData)=>{
    setIsSubmitting(true)
    try {
      if(isEditing){
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId,expenseData)
      }
      else{
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({...expenseData, id:id})
      }
      navigation.goBack()
    } catch (error) {
      setError("Could not save data- please try again later")
      setIsSubmitting(false)
    }
  }

  

  if(error && !isSubmitting)
  {
    return <ErrorOverlay message={error} 
     />
  }


  useLayoutEffect(()=>{
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  },[navigation, isEditing])

  if(isSubmitting)
  {
    return <LoadingOverlay />
  }

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