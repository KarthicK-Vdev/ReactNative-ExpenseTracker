import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyle } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import Report from './screens/Report';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return <BottomTabs.Navigator 
    screenOptions={({navigation})=>({
      headerStyle:{backgroundColor:GlobalStyle.colors.primary600},
      headerTintColor:"white",
      tabBarStyle:{backgroundColor:GlobalStyle.colors.primary600},
      tabBarActiveTintColor:GlobalStyle.colors.accent500,
      headerRight:({tintColor})=>(<IconButton icon="add" size={24} color={tintColor} onPress={()=>{
        navigation.navigate("ManageExpense")
      }} />),

    })}
  >
    <BottomTabs.Screen name='RecentExpenses' 
    component={RecentExpense}
    options={{
      title:"Recent Expenses",
      tabBarLabel:"Recent",
      tabBarIcon:({color, size})=><Ionicons name="hourglass" size={size} color={color} />
    }}
    />
    <BottomTabs.Screen name='AllExpenses' 
    component={AllExpenses} 
    options={{
      title:"All Expenses",
      tabBarLabel:"All Expenses",
      tabBarIcon:({color, size})=><Ionicons 
      name="calendar" size={size} color={color} />
    }}
    />
    <BottomTabs.Screen name='Report' 
    component={Report} 
    options={{
      title:"Report",
      tabBarLabel:"Report",
      tabBarIcon:({color, size})=><Ionicons 
      name="analytics" size={size} color={color} />
    }}
    />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <ExpensesContextProvider>
       <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle:{backgroundColor:GlobalStyle.colors.primary600}
          }}>
            <Stack.Screen name='ExpensesOverview' 
            component={ExpensesOverview} 
            options={{
              headerShown:false
            }}
            />
            <Stack.Screen name='ManageExpense' 
            component={ManageExpense}
            options={{
              presentation:"modal",
            }}
            />
          </Stack.Navigator>
       </NavigationContainer>
       </ExpensesContextProvider>
    </>
  );
}

