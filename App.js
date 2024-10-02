import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpenses from './screens/AllExpenses';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return <BottomTabs.Navigator>
    <BottomTabs.Screen name='RecentExpenses' 
    component={RecentExpense} />
    <BottomTabs.Screen name='AllExpenses' 
    component={AllExpenses} />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
       <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} />
            <Stack.Screen name='ManageExpense' 
            component={ManageExpense} />
          </Stack.Navigator>
       </NavigationContainer>
    </>
  );
}

