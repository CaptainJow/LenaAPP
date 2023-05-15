import React, { createContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/Home';
import Blog from '../Components/Blog';
import { MyContext } from '../Context/SelectedItemContext';

const Stack = createStackNavigator();

function Routes() {
  const [contextValue, setContextValue] = useState({});

  return (
    <MyContext.Provider value={{ contextValue, setContextValue }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Blog" component={Blog} options={({ title: contextValue.title ,headerTitleStyle: { fontSize: 10 } })} />
      </Stack.Navigator>
    </MyContext.Provider>
  );
}

export default Routes;
