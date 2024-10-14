import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import Button from '../../UI/Button'

const ExpenseForm = ({submitButtonLabel, onCancel, onSubmit}) => {
  const [inputValues, setInputValues]=useState({
    amount:"",
    date:"",
    description:""
  })
    const inputChangeHandler=(inputIdentifier, enteredValue)=>{
      setInputValues((curInputValues)=>{
        return {...curInputValues,[inputIdentifier]:enteredValue}
      })
    }

    const submitHandler=()=>{
      const expenseData = {
        amount: +inputValues.amount,
        date: new Date(inputValues.date),
        description:inputValues.description
      }
      onSubmit(expenseData)
    }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
        label="Amount" 
        style={styles.rowInput}
        textInputConfig={{
          keyboardType:"decimal-pad",
          onChangeText:inputChangeHandler.bind(this, 'amount'),
          value:inputValues.amount
        }}/>
        <Input label="Date"
        style={styles.rowInput}
        textInputConfig={{
          placeHolder:"yyyy-mm-dd",
          maxLength:10,
          onChangeText:inputChangeHandler.bind(this, 'date'),
          value:inputValues.date
        }}
        />
      </View>
      <Input label="Description"
      textInputConfig={{
        multiline:true,
        // autoCapitalize:"none"
        // autocorrect:false //default is true
        onChangeText:inputChangeHandler.bind(this, 'description'),
          value:inputValues.description
      }}

      />

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} 
        onPress={submitHandler}>
          {submitButtonLabel}</Button>
      </View>

    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form:{
    marginTop:40,
  },
  inputsRow:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  rowInput:{
    flex:1,
  },
  title:{
    fontSize:18,
    fontWeight:"bold",
    color:"white",
    marginVertical:24,
    textAlign:"center",
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