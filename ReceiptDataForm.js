import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebaseConfig";
import { useRoute } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

const ReceiptDataForm = ({ navigation }) => {
    const [Receipt, setReceipt] = useState("");
    const [isDead, setIsDead] = useState(false);
    const [ReceiptHealth, setReceiptHealth] = useState(5);

    const route = useRoute();

    useEffect(() => {
        // Access the email parameter from the route params
        const { email } = route.params || {};
    }, [route]);

    const addReceipt = async () => {
        try {
            const docRef = await addDoc(
                collection(FIRESTORE_DB, "ReceiptsData"),
                {
                    ReceiptID: Receipt,
                    dead: isDead,
                    ReceiptHealth: ReceiptHealth,
                    email: route.params.email.toLowerCase(),
                    timestamp: serverTimestamp(),
                }
            );
            console.log("Added Receipt with ID: ", docRef.id);
            setReceipt("");
            setIsDead(false);
            setReceiptHealth(5); // Reset all the Receipt status variables
        } catch (error) {
            console.error("Error adding Receipt: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.formTitles}>Receipt ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Instead of QR code, enter Receipt ID"
                    onChangeText={(text) => setReceipt(text)}
                    value={Receipt}
                />
            </View>
            <View style={styles.form}>
                <Text style={styles.formTitles}>Dead</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#00cc44" }}
                    thumbColor={isDead ? "#ccffdd" : "#f4f3f4"}
                    onValueChange={(value) => setIsDead(value)}
                    value={isDead}
                />
            </View>
            <View>
                <Text style={styles.formTitles}>
                    Receipt Health: {ReceiptHealth}
                </Text>
                <View style={{ alignItems: "center" }}>
                    <Slider
                        style={{ width: 300, height: 50 }}
                        minimumValue={0}
                        maximumValue={10}
                        step={1}
                        minimumTrackTintColor="#00cc44"
                        maximumTrackTintColor="#006622"
                        thumbTintColor="#00cc44"
                        value={ReceiptHealth}
                        onValueChange={(value) => setReceiptHealth(value)}
                    />
                </View>
            </View>
            <Button
                onPress={addReceipt}
                title="Add Receipt"
                disabled={Receipt === ""}
            />
        </View>
    );
};

export default ReceiptDataForm;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },

    form: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },

    formTitles: {
        marginRight: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: "#2F5233",
        backgroundColor: "#e6ffe6",
        height: 40,
        borderRadius: 4,
        flex: 1,
        padding: 10,
    },
});
