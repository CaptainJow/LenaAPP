import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/Home';

const Stack = createStackNavigator();

function Routes() {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </>
  )
}

export default Routes