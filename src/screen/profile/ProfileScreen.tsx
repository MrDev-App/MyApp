import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth } from '../../navigation/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../navigation/type';

const ProfileScreen = () => {
  const { isGuest, logout } = useAuth();
  const rootNavigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const handleAuthRedirect = () => {
    // Navigate to Auth stack (Login screen)
    rootNavigation.replace('Auth', { screen: 'Login' });
  };

  const handleLogout = async () => {
    await logout();
    rootNavigation.replace('Auth', { screen: 'Login' });
  };

  if (isGuest) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Screen</Text>
        <Text style={styles.subtitle}>
          This screen is restricted for guests. Please log in or sign up to view your profile.
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={handleAuthRedirect}>
          <Text style={styles.buttonText}>Log In or Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.subtitle}>Welcome back! You have full access to your profile.</Text>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 22,
  },
  button: {
    width: '80%',
    backgroundColor: '#2C8358',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
