import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Groups = ({ navigation }) => {
  const originalGroups = [
    { id: '1', name: 'CAB RIDE LOL', participants: 3, price: '$24.78' },
    { id: '2', name: 'BRUNCH', participants: 5, price: '$42.30' },
    { id: '4', name: 'COSTCO SPLIT', participants: 2, price: '$103.47' },
  ];
  
  const [groups, setGroups] = useState(originalGroups);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setGroups(originalGroups);
      return;
    }
    const formattedQuery = text.toLowerCase();
    const filteredGroups = originalGroups.filter(group => {
      return group.name.toLowerCase().includes(formattedQuery);
    });
    setGroups(filteredGroups);
  };

  
  const renderItem = ({ item }) => (
    <View style={styles.groupItem}>
      <View style={styles.iconPlaceholder} />
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.groupDetails}>{item.participants} people - {item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Icon name="arrow-back" size={30} color="#FFFFFF" onPress={() => navigation.navigate('ReceiptDataForm')} />
        <Text style={styles.title}>GROUPS</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => { /* Handle create group */ }}>
          <Icon name="add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Groups"
        placeholderTextColor="#000000" // Placeholder text color
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
    paddingTop: 50,
  },
  header: {
    paddingTop: 50,
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
    fontSize: 25,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    color: '#000000',
  },
  groupDetails: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  groupItem: {
    backgroundColor: '#6B81FF', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5, 
    borderRadius: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: '#FFFFFF',
  },
});

export default Groups;
