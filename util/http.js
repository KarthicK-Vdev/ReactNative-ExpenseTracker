import axios from "axios";

export function storeExpense(expenseData){
    axios.post('https://expense-tracker-7a464-default-rtdb.firebaseio.com/expenses.json',{expenseData})
}