import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  KeyboardAvoidingView, Platform,
  Text, StyleSheet, Image, TextInput,
  TouchableOpacity
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  /*
    caso a aplicação seja fechada ou atualizada,
    vai no AsyncStorage buscar se a informação do usuário
    está presente e se sim (o usuário já logou na aplicação)
    e navega ele diretamente pra rota Main
  */
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user })
      }
    })
  }, []);

  async function handleLogin() {

    // cadastrando o usuário
    const response = await api.post('/devs', { username: user })

    // recuperando id do usuário
    const { _id } = response.data;

    /* 
      assim que fizer login, uma informação será salva
      no AsyncStorage
    */
    await AsyncStorage.setItem('user', { _id });

    navigation.navigate('Main', { user: _id });
  }

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logo} />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#df4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});