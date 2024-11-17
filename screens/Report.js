import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStyle } from '../constants/styles'
import { fetchExpenses } from '../util/http';
import { ExpensesContext } from '../store/expenses-context';
import ErrorOverlay from '../UI/ErrorOverlay';
import LoadingOverlay from '../UI/LoadingOverlay';
import Button from '../UI/Button';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const Report = () => {
    const today = new Date();
    const expensesCtx = useContext(ExpensesContext)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()

    const [month, setMonth] = useState(today.getMonth())

    useEffect(() => {
        const getExpenses = async () => {
            setIsFetching(true)
            try {
                const expenses = await fetchExpenses()
                expensesCtx.setExpenses(expenses)
            } catch (error) {
                setError("Could not fetch expenses!")
            }
            setIsFetching(false)
        }
        getExpenses()
    }, [])

    const monthlyExpenses = expensesCtx.expenses.filter((expense) => {
        return expense.date.getMonth() === month;
    })

    const expensesSum = monthlyExpenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)


const downloadExpense = async () => {
    const formattedData = monthlyExpenses
        .map(expense => `Date: ${expense.date.toDateString()}, Description: ${expense.description}, Amount: ${expense.amount}`)
        .join('\n');

    const fileContent = `Monthly Expenses Report\n\nTotal Expenses: $${expensesSum}\n\nDetails:\n${formattedData}`;
    const path = `${FileSystem.documentDirectory}monthly_expenses_report.txt`;

    try {
        await FileSystem.writeAsStringAsync(path, fileContent, { encoding: FileSystem.EncodingType.UTF8 });
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(path);
        } else {
            Alert.alert('Sharing not available on this device');
        }
    } catch (error) {
        Alert.alert('Error', 'Failed to download file');
    }
};


    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Your monthly report is here</Text>
                <View style={styles.monthContainer}>
                    <Text style={styles.text}>This Month Expense: ${expensesSum}</Text>
                </View>
            </View>
            <View>
                <Button style={styles.button} onPress={downloadExpense}>Get your Report</Button>
            </View>
        </View>
    )
}

export default Report

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyle.colors.primary700,
        height: "100%"
    },
    heading: {
        color: GlobalStyle.colors.accent500,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 2,
    },
    text: {
        height: "40%",
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    button: {
        minWidth: 100,
        marginHorizontal: 8
    },
    textContainer: {
        height: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    monthContainer: {
        height: "40%",
        justifyContent: "center",
    }
})
