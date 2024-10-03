import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import IconButton from '../UI/IconButton';
import { GlobalStyle } from '../constants/styles';

const ManageExpense = ({route, navigation}) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId;

  const deleteExpenseHandler = () =>{

  }


  useLayoutEffect(()=>{
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  },[navigation, isEditing])

  return (
    <View style={styles.container}>
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
  }
})