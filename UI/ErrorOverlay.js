import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../constants/styles'
import Button from './Button'

const ErrorOverlay = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:24,
        backgroundColor:GlobalStyle.colors.primary700,
    },
    text:{
        textAlign:"center",
        margin:8,
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    },
    
})