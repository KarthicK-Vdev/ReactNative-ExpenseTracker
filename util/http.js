import axios from "axios";

const BACKEND_URL = "https://expense-tracker-7a464-default-rtdb.firebaseio.com"

export async function storeExpense(expenseData){
    const response = await axios.post(`${BACKEND_URL}/expenses.json`,expenseData)
    const id = response.data.name
    return id
}

export async function fetchExpenses(){
    try {
        const response = await axios.get(`${BACKEND_URL}/expenses.json`)
        // console.log(response.data)
        const expenses = [];
        for(const key in response.data)
        {
            // const expenseDate = response.data[key].date;  // Log the date to check format
            // console.log("Expense Date:", expenseDate);
            const expenseObj={
                id:key,
                amount:response.data[key].amount,
                date:new Date(response.data[key].date),
                description: response.data[key].description
            }
            expenses.push(expenseObj)
        }
        return expenses
    } catch (error) {
        console.log(error)
    }
}

export function updateExpense(id, expenseData){
    return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData)
}

export async function deleteExpense(id){
    return axios.delete(`${BACKEND_URL}/expenses/${id}.json`)
}