import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const ScanReceiptScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <ActivityIndicator size="large" />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const onTakePicturePressed = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log("photo", photo);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFillObject}
                type={Camera.Constants.Type.back}
            >
                <View style={styles.cameraFooter}>
                    <TouchableOpacity
                        onPress={onTakePicturePressed}
                        style={styles.captureButton}
                    >
                        <Ionicons
                            name="camera-outline"
                            size={30}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    backButton: {
        position: "absolute",
        top: 60,
        left: 20,
        zIndex: 10, // Ensure the button is clickable over the camera view
    },
    cameraFooter: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 50,
    },
    captureButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ScanReceiptScreen;
