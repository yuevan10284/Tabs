import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
const ReceiptDataForm = ({ navigation }) => {
  
  // Function placeholders for menu options
  const goToGroups = () => {
    navigation.navigate('Groups');
  };

  const goToScan = () => {
    navigation.navigate('ScanReceiptScreen');
  };

  const goToPay = () => {
    // navigation.navigate('PayLater');
  };

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Icon name="person-circle-outline" size={80} color="#FFFFFF" />
        <Text style={styles.profileName}>Naruto Uzumaki</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Options */}
      <TouchableOpacity onPress={() => {}} style={styles.menuItem}>
        <Text style={styles.menuItemText}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToGroups} style={styles.menuItem}>
        <Text style={styles.menuItemText}>GROUPS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToScan} style={styles.menuItem}>
        <Text style={styles.menuItemText}>SCAN RECEIPT</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}} style={styles.menuItem}>
        <Text style={styles.menuItemText}>PAY</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToHomeScreen} style={styles.menuItem}>
        <Text style={styles.menuItemText}>SIGN OUT</Text>
      </TouchableOpacity>

      {/* Footer Icons */}
      <View style={styles.footer}>
        <Icon name="bulb-outline" size={30} color="#FFFFFF" />
        <Icon name="qr-code-outline" size={30} color="#FFFFFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B4BFD',
    
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 40,
    paddingTop: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  viewProfileText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  menuItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10, 
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ReceiptDataForm;