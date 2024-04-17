import { Camera } from "expo-camera";
import React from "react";
import { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useCameraPermission } from "react-native-vision-camera";
import Icon from "react-native-vector-icons/Ionicons"; // Ensure you've imported Icon

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
        return <Text>Camera not found</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
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
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10, // Ensure the button is clickable over the camera view
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
