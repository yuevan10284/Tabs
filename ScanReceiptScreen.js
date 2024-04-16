import { Camera } from "expo-camera";
import React from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCameraPermission } from "react-native-vision-camera";
//import { RNCamera } from 'react-native-camera';
//import Icon from 'react-native-vector-icons/Ionicons';

const ScanReceiptScreen = ({ navigation }) => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraPermission("back");
    console.log("hasPermission", hasPermission);

    useEffect(() => {
        requestPermission();
    }, [hasPermission]);

    if (!hasPermission) {
        return <ActivityIndicator />;
    }

    if (!device) {
        return <Text>camera not found</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4B4BFD",
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    cameraFooter: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
    },
});

export default ScanReceiptScreen;
