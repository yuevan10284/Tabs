import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlantDataInput from './PlantDataInput';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ScanReceiptScreen from './ScanReceiptScreen';
import { AuthContext } from './AuthContext';

const Stack = createStackNavigator();

function Navigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Scanner" : "Login"}
        screenOptions={{
          headerShown: false, 
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="ScanReceiptScreen" component={ScanReceiptScreen} />
            
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{
                headerShown: false 
              }} 
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen} 
              options={{
                headerShown: false 
              }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
