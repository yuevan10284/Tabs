import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Groups = ({ navigation }) => {
  const [groups, setGroups] = useState([
    // Dummy data for the groups list
    { id: '1', name: 'CAB RIDE LOL' },
    { id: '2', name: 'BRUNCH' },
    { id: '3', name: 'FAMILY DINNER' },
    { id: '4', name: 'CAFE UNI' },
    { id: '5', name: 'BFFS MEET UP' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Add the search functionality here if needed
  };

  const renderItem = ({ item }) => (
    <View style={styles.groupItem}>
      <View style={styles.iconPlaceholder} />
      <Text style={styles.groupName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Icon name="arrow-back" size={30} color="#FFFFFF" onPress={() => navigation.navigate('ReceiptDataForm')} />
        <Text style={styles.title}>GROUPS</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => { /* Handle create group */ }}>
          <Icon name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Groups"
        placeholderTextColor="#ccc" // Placeholder text color
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B4BFD',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#4B4BFD',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    // Style for add button
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    color: '#FFFFFF',
  },
  groupItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 25,
    marginRight: 10,
  },
  groupName: {
    fontSize: 18,
  },
});

export default Groups;
