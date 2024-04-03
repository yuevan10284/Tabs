import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            navigation.navigate("ReceiptDataForm", { email });
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.fullContainer}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("HomeScreen")}
                >
                    <Icon name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    onSubmitEditing={handleLogin}
                    returnKeyType="done"
                />
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        paddingTop: 50,
    },
    header: {
        marginLeft: 10,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default LoginScreen;
