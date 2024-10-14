import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../../constants/styles'

const Input = ({label, textInputConfig}) => {
    const inputStyles=[styles.input]
    if(textInputConfig && textInputConfig.multiline)
    {
        inputStyles.push(styles.inputMultiline)
    }
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.lable}>{label}</Text>
      <TextInput style={inputStyles} 
      {...textInputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8,
    },
    lable:{
        fontSize:12,
        color:GlobalStyle.colors.primary100,
        marginBottom:4,
    },
    input:{
        backgroundColor:GlobalStyle.colors.primary100,
        color:GlobalStyle.colors.primary700,
        padding:6,
        borderRadius:6,
        fontSize:18,
    },
    inputMultiline:{
        minHeight:100,
        textAlign:"top"
    }
})