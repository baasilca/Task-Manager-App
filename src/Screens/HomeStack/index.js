import React from 'react';
import { LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../Onboarding'
import CreateTask from '../CreateTask'
import TaskList from '../TaskList'

const Stack = createNativeStackNavigator();

function App(props) {

  LogBox.ignoreAllLogs();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Onboarding}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="TaskList"
        component={TaskList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator >
  );
}

export default App;
