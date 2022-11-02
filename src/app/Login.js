import React, { useState } from "react";
import { Text, View, TextInput, ActivityIndicator, Button, Image, SafeAreaView, Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaPersonagem from "./ListaPersonagem";
import DetalhesPersonagem from "./DetalhesPersonagem";
import Hq from "./Hq";
import Series from "./Series";
import Historia from "./Historia";
import Eventos from "./Eventos";
import ValidateLogin, { EMAIL, MENSAGEM_EMAIL, MENSAGEM_SENHA, SENHA } from "../js/LoginService";
import Estilos from "../estilos/Estilos";

const Stack = createNativeStackNavigator();

const TelaLogin = ({ navigation }) => {
  const [user, setUser] = useState(EMAIL);
  const [password, setPassword] = useState(SENHA);
  const [activity, setActivity] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={Estilos.safeAreaView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={Estilos.centeredView}>
          <View style={Estilos.modalView}>
            <Text style={Estilos.modalText}>{description}</Text>
            <View style={Estilos.button}>
              <Button onPress={() => setModalVisible(!modalVisible)} title="Fechar" />
            </View>
          </View>
        </View>
      </Modal>
      <Image style={Estilos.logo} source={require("../imagens/marvelLogo.png")} />
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
        <Button title="Login"
                onPress={() => ValidateLogin(user, password, navigation, setActivity, setModalVisible, setDescription)} />
      </View>
      <View style={{ marginTop: 10 }}>
        <ActivityIndicator size="large" animating={activity} />
      </View>
    </SafeAreaView>
  );
};

const Login = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={
        {
          headerStyle: {
            backgroundColor: "#FF0000",
          },
          headerTintColor: "#fff",
        }
      }>
        <Stack.Screen name="Login" component={TelaLogin} options={{ title: "Marvel App - Login" }} />
        <Stack.Screen name="Personagem" component={ListaPersonagem} options={
          {
            title: "Marvel Login - Personagens",
            headerBackVisible: false,
          }
        }
        />
        <Stack.Screen name="DetalhesPersonagem" component={DetalhesPersonagem}
                      options={{ title: "Marvel App - Detalhes" }} />
        <Stack.Screen name="HQ" component={Hq} options={{ title: "Marvel App - HQ´s" }} />
        <Stack.Screen name="Series" component={Series} options={{ title: "Marvel App - Series" }} />
        <Stack.Screen name="Historia" component={Historia} options={{ title: "Marvel App - História" }} />
        <Stack.Screen name="Eventos" component={Eventos} options={{ title: "Marvel App - Eventos" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Login;
