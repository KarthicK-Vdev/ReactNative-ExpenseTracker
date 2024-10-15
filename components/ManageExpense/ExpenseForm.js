import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import Button from '../../UI/Button'
import { getFormattedDate } from '../../util/date'
import { GlobalStyle } from '../../constants/styles'

const ExpenseForm = ({submitButtonLabel, onCancel, onSubmit, defaultValues}) => {
  const [inputs, setInputs]=useState({
    amount:
    {value: defaultValues ? defaultValues.amount.toString() : "",
      isValid:true,
    },
    date:{value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid:true
    },
    description:{value: defaultValues ? defaultValues.description : "",
      isValid:true
    }
  })
    const inputChangeHandler=(inputIdentifier, enteredValue)=>{
      setInputs((curInputValues)=>{
        return {...curInputValues,
          [inputIdentifier]:{value : enteredValue, isValid:true}}
      })
    }

    const submitHandler=()=>{
      const expenseData = {
        amount: +inputs.amount.value,
        date: new Date(inputs.date.value),
        description:inputs.description.value
      }
      const amountIsValid = !isNaN(expenseData.amount)&&expenseData.amount > 0
      const dateIsValid = expenseData.date.toString()!=='Invalid Date'
      const descriptionIsValid = expenseData.description.trim().length > 0

      if(!amountIsValid || !dateIsValid || descriptionIsValid){
        // Alert.alert("Invalid Input", "Please check your input values")
        setInputs((curInputs)=>{
          return{
            amount:{value:curInputs.amount.value,
              isValid:amountIsValid
            },
            date:{value:curInputs.date.value,
              isValid:dateIsValid
            },
            description:{value:curInputs.description.value,
              isValid:descriptionIsValid
            }
          }
        })
        return
      }

      onSubmit(expenseData)
    }
    const fromIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
        label="Amount" 
        style={styles.rowInput}
        invalid={!inputs.amount.isValid}
        textInputConfig={{
          keyboardType:"decimal-pad",
          onChangeText:inputChangeHandler.bind(this, 'amount'),
          value:inputs.amount.value
        }}/>
        <Input label="Date"
        style={styles.rowInput}
        invalid={!inputs.date.isValid}
        textInputConfig={{
          placeHolder:"yyyy-mm-dd",
          maxLength:10,
          onChangeText:inputChangeHandler.bind(this, 'date'),
          value:inputs.date.value
        }}
        />
      </View>
      <Input 
      label="Description"
      invalid={!inputs.description.isValid}
      textInputConfig={{
        multiline:true,
        // autoCapitalize:"none"
        // autocorrect:false //default is true
        onChangeText:inputChangeHandler.bind(this, 'description'),
          value:inputs.description.value
      }}

      />
      {fromIsInvalid && 
      <Text style={styles.errorText}>Error: check your input</Text>}

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
  errorText:{
    textAlign:"center",
    color:GlobalStyle.colors.error500,
    margin:8,
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