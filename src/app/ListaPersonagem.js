import React, { useEffect, useState } from "react";
import {
  SafeAreaView, Text, TextInput, View, FlatList, Button, ActivityIndicator, Pressable, Image, BackHandler, Modal
} from "react-native";
import Estilos from "../estilos/Estilos";
import DetalhesPersonagem from "./DetalhesPersonagem";
import BuscarPersonagem, { PERSONAGEM_DEFAULT } from "../js/ListaPersonagemService";

const App = ({ navigation }) => {
  const [jsonData, setJsonData] = useState("");
  const [personagem, setPersonagem] = useState(PERSONAGEM_DEFAULT);
  const [activity, setActivity] = useState(false);
  const [totalPersonagens, setTotalPersonagens] = useState(0);
  const [totalGeralPersonagens, setTotalGeralPersonagens] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState(null);

  // Evento é executado somente quando a tela é carregada
  useEffect(() => {
    //console.warn("Evento é executado somente quando a tela é carregada");
    setPersonagem(PERSONAGEM_DEFAULT);
    BuscarPersonagem(personagem, setTotalPersonagens, setJsonData, setActivity);
  }, []);

  // Evento é executado somente quando a tela é carregada
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => backHandler.remove();
  }, []);

  // Sempre acionado quando a tela é renderizada
  useEffect(() => {
    //console.warn("Sempre acionado quando a tela é renderizada");
  });

  // Acionado somente quando o total de personagens é atualizado
  useEffect(() => {
    //console.warn("Acionado somente quando o total de personagens é atualizado");
  }, [totalPersonagens]);

  const Personagem = ({ item, evento, link }) => (<View>
    <Pressable onPress={evento}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
        <View>
          <Text style={Estilos.personagemParagraph}>{item.name}</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
      </View>
      <Image
        style={Estilos.imagemPersonagem}
        source={{
          uri: link,
        }}
      />
    </Pressable>
  </View>);

  const PersonagemItem = ({ item }) => (<Personagem
    item={item}
    evento={() => {
      setItem(item);
      setModalVisible(true);
    }}
    link={item.thumbnail.path + "/portrait_uncanny.jpg"} />);

  return (<SafeAreaView style={Estilos.safeAreaView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}>
      <View style={Estilos.centeredView}>
        <View style={Estilos.modalView}>
          <Text style={Estilos.modalTextTitle}>{item?.name}</Text>
          <Text
            style={Estilos.modalText}>{item?.description === "" ? "Personagem sem descrição" : item?.description}</Text>
          <View style={Estilos.alignVertical}>
            <Button style={Estilos.button} onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate("DetalhesPersonagem", {
                item: item,
              });
            }} title="Detalhes" />
            <View style={{ flex: 0.1 }} />
            <Button onPress={() => setModalVisible(!modalVisible)} title="Fechar" />
          </View>
        </View>
      </View>
    </Modal>
    <View style={Estilos.alignVertical}>
      <View style={{ flex: 0.1 }} />
      <Text style={Estilos.detalhePersonagem}>Buscar Personagem</Text>
    </View>
    <TextInput
      autoCorrect={false}
      style={Estilos.textInput}
      clearButtonMode="always"
      placeholder={"Ex: " + PERSONAGEM_DEFAULT}
      onChangeText={(value) => setPersonagem(value)}
      onEndEditing={() => BuscarPersonagem(personagem, setTotalPersonagens, setJsonData, setActivity)}
    />
    <View style={Estilos.button}>
      <Button title="Pesquisar" onPress={() => {
        BuscarPersonagem(personagem, setTotalPersonagens, setJsonData, setActivity);
      }} />
    </View>
    <View style={{ marginTop: 10 }}>
      <ActivityIndicator size="large" animating={activity} />
    </View>
    <Text style={Estilos.personagem}>{totalPersonagens} de {totalGeralPersonagens} Personagens Encontrados</Text>
    <FlatList
      style={{ marginTop: 10 }}
      data={jsonData}
      renderItem={PersonagemItem}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>);

};

export default App;
