import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../../constants/styles'
import { getFormattedDate } from '../../util/date'

const ExpenseItem = ({description, amount, date}) => {
  return (
    <Pressable>
        <View style={styles.expenseItem}>
            <View>
                <Text 
                style={[styles.textBase, styles.description]}>{description}</Text>
                <Text style={styles.textBase}>
                  {getFormattedDate(date)}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>
                  {amount.toFixed(2)}</Text>
            </View>
        </View>
    </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
    expenseItem:{
      padding:12,
      marginVertical:8,
      backgroundColor:GlobalStyle.colors.primary500,
      flexDirection:"row",
      borderRadius:6,
      elevation:3,
      justifyContent:"space-between",
    },
    textBase:{
      color:GlobalStyle.colors.primary100,
    },
    description:{
      fontSize:16,
      marginBottom:4,
      fontWeight:"bold"
    },
    amountContainer:{
      paddingHorizontal:12,
      paddingVertical:4,
      backgroundColor:"white",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:4,
      minWidth:80
    },
    amount:{
      color:GlobalStyle.colors.primary600,
      fontWeight:"bold",
    }
})