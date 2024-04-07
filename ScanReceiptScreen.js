import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

const ScanReceiptScreen = ({ navigation }) => {
  const takePicture = async (camera) => {
    try {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      // data.uri contains the image path
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false} // Add this line if you are not recording videos
      >
        {({ camera, status }) => {
          if (status !== 'READY') return null;
          return (
            <View style={styles.cameraFooter}>
              <Icon name="close-circle-outline" size={50} color="#FFFFFF" onPress={() => navigation.goBack()} />
              <Icon name="camera-outline" size={50} color="#FFFFFF" onPress={() => takePicture(camera)} />
              <Icon name="checkmark-circle-outline" size={50} color="#FFFFFF" />
              {/* Implement functionality to use the picture after taking it */}
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B4BFD',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraFooter: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export default ScanReceiptScreen;