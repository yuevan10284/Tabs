import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B4BFD' // Using the same blue background as in your other screens.
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF' // White text for visibility on the blue background.
  }
});

export default Profile;
