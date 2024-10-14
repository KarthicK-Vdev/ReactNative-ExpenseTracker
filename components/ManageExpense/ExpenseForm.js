import { View, Text } from 'react-native'
import React from 'react'
import Input from './Input'

const ExpenseForm = () => {
    const amountChangedHandler=()=>{

    }
  return (
    <View>
      <Input label="Amount" textInputConfig={{
        keyboardType:"decimal-pad",
        onChangeText:amountChangedHandler,
      }}/>
      <Input label="Date"
      textInputConfig={{
        placeHolder:"yyyy-mm-dd",
        maxLength:10,
        onChangeText:()=>{}
      }}
      />
      <Input label="Description"
      textInputConfig={{
        multiline:true,
        // autoCapitalize:"none"
        // autocorrect:false //default is true
      }}
      />
    </View>
  )
}

export default ExpenseForm