import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReceiptDataForm from "./ReceiptDataForm";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import ScanReceiptScreen from "./ScanReceiptScreen"; // Import ScanReceiptScreen
import Groups from "./Groups";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ReceiptDataForm"
                    component={ReceiptDataForm}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Groups" component={Groups} options={{ headerShown: false }} />
                <Stack.Screen 
                    name="ScanReceiptScreen" 
                    component={ScanReceiptScreen} 
                    options={{ headerShown: false }} 
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}
