import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth } from '../../navigation/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthParams, StackParams } from '../../navigation/type';

const LoginScreen = () => {
  const { login, skipLogin } = useAuth();
  const rootNavigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const authNavigation = useNavigation<NativeStackNavigationProp<AuthParams>>();

  const handleLogin = async () => {
    // Save mock token to enter logged-in state
    await login('mock-jwt-user-token');
    rootNavigation.replace('BottomTabs');
  };

  const handleSkip = async () => {
    // Enter guest mode state
    await skipLogin();
    rootNavigation.replace('BottomTabs');
  };

  const handleSignUp = () => {
    authNavigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In (Full Access)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip (Guest Mode)</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    width: '80%',
    backgroundColor: '#2C8358',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  skipButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#2C8358',
    marginTop: 20,
    fontSize: 14,
    fontWeight: '600',
  },
});
