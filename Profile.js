import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Feed');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      {/* Blue Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={40} color="#4B4BFD" />
      </TouchableOpacity>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Naruto Uzumaki</Text>
        <Text style={styles.userHandle}>@uzumakinaruto999</Text>
        <View style={styles.friendContainer}>
          <TouchableOpacity style={styles.addFriendButton}>
            <Text style={styles.addFriendText}>Add Friend</Text>
          </TouchableOpacity>
          <Text style={styles.friendCount}>7 Friends</Text>
        </View>
        <TouchableOpacity style={styles.payRequestButton}>
          <Text style={styles.payRequestText}>Pay or Request</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Feed' && styles.activeTab]}
          onPress={() => handleTabPress('Feed')}
        >
          <Text style={styles.tabText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Between You' && styles.activeTab]}
          onPress={() => handleTabPress('Between You')}
        >
          <Text style={styles.tabText}>Between You</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === 'Feed' ? (
          <Text style={styles.tabContentText}>Feed content goes here...</Text>
        ) : (
          <Text style={styles.tabContentText}>Between You content goes here...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  backButton: {
    margin: 10,
    marginLeft: 15,
    paddingTop: 40,
  },

  profileHeader: {
    alignItems: 'center',
    paddingBottom: 20, 
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10, 
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  userHandle: {
    color: 'grey',
    marginBottom: 10,
  },
  friendContainer: {
    flexDirection: 'row',
    marginBottom: 12, 
  },
  addFriendButton: {
    marginRight: 10,
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  addFriendText: {
    color: '#4B4BFD',
  },
  friendCount: {
    color: 'grey',
  },
  payRequestButton: {
    backgroundColor: '#4B4BFD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  payRequestText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4B4BFD',
  },
  tabText: {
    fontSize: 16,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContentText: {
    fontSize: 18,
  },
});

export default Profile;
