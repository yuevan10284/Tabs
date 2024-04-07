import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      // Make sure you have a 'ReceiptDataForm' screen in your Navigator
      navigation.navigate('ReceiptDataForm', { email });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <View style={styles.container}>
      {/* Custom back button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#4B4BFD" />
      </TouchableOpacity>
      
      <Text style={styles.logo}>Tabs</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={passwordVisibility}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          onSubmitEditing={handleLogin}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name={passwordVisibility ? 'eye-off' : 'eye'} size={24} color="grey" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.textButton}>New User? Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4B4BFD',
    marginTop: 60,
    marginBottom: 80,
  },
  input: {
    width: '80%',
    height: 50,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#4B4BFD',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  textButton: {
    marginTop: 20,
    color: '#4B4BFD',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default LoginScreen;