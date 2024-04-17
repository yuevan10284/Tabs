import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TextInput,
    Modal,
    Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Groups = ({ navigation }) => {
    // State for all groups
    const [originalGroups, setOriginalGroups] = useState([
        { id: "1", name: "CAB RIDE LOL", participants: 3, price: "$24.78" },
        { id: "2", name: "BRUNCH", participants: 5, price: "$42.30" },
        { id: "4", name: "COSTCO SPLIT", participants: 2, price: "$103.47" },
    ]);
    const [groups, setGroups] = useState(originalGroups);
    const [searchQuery, setSearchQuery] = useState("");

    const [isModalVisible, setModalVisible] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [newParticipants, setNewParticipants] = useState("");
    const [newPrice, setNewPrice] = useState("");

    // Handle search
    const handleSearch = (text) => {
        setSearchQuery(text);
        if (!text.trim()) {
            setGroups(originalGroups); // Reset to all groups when search is cleared
            return;
        }
        const formattedQuery = text.toLowerCase();
        const filteredGroups = originalGroups.filter((group) =>
            group.name.toLowerCase().includes(formattedQuery)
        );
        setGroups(filteredGroups);
    };

    // Function to add a new group
    const addGroup = () => {
        const newGroup = {
            id: String(originalGroups.length + 1),
            name: newGroupName,
            participants: parseInt(newParticipants),
            price: `$${newPrice}`,
        };
        const updatedGroups = [...originalGroups, newGroup];
        setOriginalGroups(updatedGroups); // Update original list
        setGroups(updatedGroups); // Set current view to new list
        setModalVisible(false);
        // Clear input fields
        setNewGroupName("");
        setNewParticipants("");
        setNewPrice("");
    };
    const deleteGroup = (id) => {
        const updatedGroups = originalGroups.filter((group) => group.id !== id);
        setOriginalGroups(updatedGroups);
        setGroups(updatedGroups);
    };

    const renderItem = ({ item }) => (
        <View style={styles.groupItem}>
            <View style={styles.iconPlaceholder} />
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.groupDetails}>
                    {item.participants} people - {item.price}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteGroup(item.id)}
            >
                <Icon name="trash-bin" size={22} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back"
                    size={30}
                    color="#FFFFFF"
                    onPress={() => navigation.navigate("ReceiptDataForm")}
                />
                <Text style={styles.title}>GROUPS</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="add" size={30} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Groups"
                placeholderTextColor="#000000"
                onChangeText={handleSearch}
                value={searchQuery}
            />
            <FlatList
                data={groups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Icon
                                name="close-circle"
                                size={30}
                                color="#4B4BFD"
                            />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Group Name"
                            value={newGroupName}
                            onChangeText={setNewGroupName}
                            style={styles.modalText}
                        />
                        <TextInput
                            placeholder="Number of Participants"
                            value={newParticipants}
                            onChangeText={setNewParticipants}
                            keyboardType="numeric"
                            style={styles.modalText}
                        />
                        <TextInput
                            placeholder="Total Price"
                            value={newPrice}
                            onChangeText={setNewPrice}
                            keyboardType="decimal-pad"
                            style={styles.modalText}
                        />
                        <Button title="Add Group" onPress={addGroup} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4B4BFD",
        paddingTop: 50,
    },
    header: {
        paddingTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: "#4B4BFD",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    addButton: {
        // Style for add button
        fontSize: 25,
    },
    deleteButton: {
        position: "absolute",
        right: 10,
        bottom: 10,
    },
    searchBar: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        margin: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        color: "#000000",
    },
    groupDetails: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    groupItem: {
        backgroundColor: "#6B81FF",
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: "#ddd",
        borderRadius: 25,
        marginRight: 10,
    },
    groupName: {
        fontSize: 18,
        color: "#FFFFFF",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    closeButton: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#6B81FF",
    },
});

export default Groups;
