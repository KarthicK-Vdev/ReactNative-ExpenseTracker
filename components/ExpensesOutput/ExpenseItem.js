import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../../constants/styles'
import { getFormattedDate } from '../../util/date'
import { useNavigation } from '@react-navigation/native'

const ExpenseItem = ({id,description, amount, date}) => {

  const navigation = useNavigation()

  const expensePressHanler = ()=>{
    navigation.navigate("ManageExpense",{expenseId: id})
  }

  return (
    <Pressable onPress={expensePressHanler} 
    style={({pressed})=>pressed && styles.pressed}>
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
    pressed:{
      opacity:0.75,
    },
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