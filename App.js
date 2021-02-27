/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './src/mainScreen';
import AddScreen from './src/addScreen';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';

import configureStore from './src/store/configureStore';

const store = configureStore();
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" headerMode="none">
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Add" component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
