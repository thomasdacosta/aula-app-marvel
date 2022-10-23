import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator, Button, Image, SafeAreaView, Modal } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaPersonagem from './ListaPersonagem';
import Estilos from '../estilos/Estilos';

const MENSAGEM_EMAIL = "Digite o seu e-mail.";
const MENSAGEM_SENHA = "Digite a sua senha.";
const EMAIL = "eve.holt@reqres.in";
const SENHA = "cityslicka";
const Stack = createNativeStackNavigator();

const TelaLogin = ({ navigation }) => {
  const [user, setUser] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [status, setStatus] = useState('');
  const [activity, setActivity] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");

  const ShowModal = (description) => {
      setModalVisible(true);
      setDescription(description);
  };

  const ValidateLogin = async (email, senha, navigation) => {
    if (email.trim().length === 0) {
      ShowModal(MENSAGEM_EMAIL);
      return;
    }

    if (senha.trim().length === 0) {
      ShowModal(MENSAGEM_SENHA);
      return;
    }

    setActivity(true);

    let usuario = {
      "email": email,
      "password": senha
    };

    await fetch('https://reqres.in/api/login', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(usuario)
    }).then(response => {
      if (response.status === 200) {
        response.text().then(function () {
          navigation.navigate("Personagem");
        });
      } else {
        ShowModal(`Usuário ou senha inválidos => código: ${response.status}`);
      }
      setActivity(false);
    }).catch((e) => {
      ShowModal("Não foi possivel executar o login =>" + e);
      setActivity(false);
    });
  }

  return (
    <SafeAreaView style={Estilos.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={Estilos.centeredView}>
          <View style={Estilos.modalView}>
            <Text style={Estilos.modalText}>{description}</Text>
            <View style={Estilos.button}>
              <Button onPress={() => setModalVisible(!modalVisible)} title="Fechar"/>
            </View>
          </View>
        </View>
      </Modal>
      <Image style={Estilos.logo} source={require('../../marvelLogo.png')} />
      <Text style={Estilos.personagem}>E-mail:</Text>
      <TextInput
        autoCorrect={false}
        placeholder={MENSAGEM_EMAIL}
        placeholderTextColor="grey"
        style={Estilos.textInput}
        clearButtonMode="always"
        defaultValue={EMAIL}
        onChangeText={(value) => setUser(value)}
      />
      <Text style={Estilos.personagem}>Senha:</Text>
      <TextInput
        autoCorrect={false}
        placeholder={MENSAGEM_SENHA}
        placeholderTextColor="grey"
        secureTextEntry={true}
        style={Estilos.textInput}
        clearButtonMode="always"
        defaultValue={SENHA}
        onChangeText={(value) => setPassword(value)}
      />
      <View style={Estilos.button}>
        <Button title="Login" onPress={() => ValidateLogin(user, password, navigation)}/>
      </View>
      <View style={{marginTop: 10}}>
        <ActivityIndicator size="large" animating={activity}/>
      </View>
      <Text style={Estilos.personagem}>{status}</Text>
    </SafeAreaView>
  )
}

const Login = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerStyle: {
          backgroundColor: '#FF0000',
        },
        headerTintColor: '#fff',
      }}>
        <Stack.Screen name="Login" component={TelaLogin} options={{ title: 'Marvel Login - Login' }} />
        <Stack.Screen name="Personagem" component={ListaPersonagem} options={
          {
            title: 'Marvel Login - Personagens',
            headerBackVisible: false }
        }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Login;
