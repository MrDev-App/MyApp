import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth } from '../../navigation/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthParams, StackParams } from '../../navigation/type';

const SignupScreen = () => {
  const { login } = useAuth();
  const rootNavigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const authNavigation = useNavigation<NativeStackNavigationProp<AuthParams>>();

  const handleSignUp = async () => {
    // Register and login user
    await login('mock-jwt-user-token');
    rootNavigation.replace('BottomTabs');
  };

  const handleLogin = () => {
    authNavigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Screen</Text>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Register & Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

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
  loginText: {
    color: '#2C8358',
    marginTop: 20,
    fontSize: 14,
    fontWeight: '600',
  },
});
