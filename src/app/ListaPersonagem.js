import React, {useEffect, useState} from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  ActivityIndicator, Pressable, Image, StyleSheet, BackHandler, Modal,
} from "react-native";
import Estilos from '../estilos/Estilos';

const App = () => {
  const PERSONAGEM_DEFAULT = "wolverine";

  const [jsonData, setJsonData] = useState("");
  const [personagem, setPersonagem] = useState(PERSONAGEM_DEFAULT);
  const [activity, setActivity] = useState(false);
  const [totalPersonagens, setTotalPersonagens] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const URL = "http://gateway.marvel.com/v1/public/" +
    "characters?ts=1" +
    "&apikey=f59dbe01285f1d360542b5c47a9516e3" +
    "&hash=0ea6be79e04ac1b0400d65ffc11088f9" +
    "&nameStartsWith=" + personagem + "&orderBy=name&limit=100";

  const JSON_RETORNO_VAZIO = [
    {
      "id": 1,
      "name": "Nenhum personagem encontrado. \nVamos ficar com Cap nos nossos corações.",
      "description": "Eu também gosto dele :)",
      "modified": "2020-04-04T19:01:59-0400",
      "thumbnail": {
        "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087",
        "extension": "jpg",
      },
    },
  ];

  const MarvelApiClient = async (url, exibir) => {
    await fetch(url, {
      method: "GET",
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((result) => {
          if (result.data.results.length === 0)
            exibir(JSON_RETORNO_VAZIO, 0);
          else
            exibir(result.data.results, result.data.results.length);
        });
      } else
        exibir(JSON_RETORNO_VAZIO, 0);
    }).catch(() => exibir(JSON_RETORNO_VAZIO, 0));
  };

  const ExibirBusca = (json, total) => {
    setJsonData(json);
    setTotalPersonagens(total);
  };

  const BuscarPersonagem = () => {
    setTotalPersonagens(0);
    setJsonData(null);
    setActivity(true);
    MarvelApiClient(URL, ExibirBusca).then(() => {});
    setActivity(false);
  };

  // Evento é executado somente quando a tela é carregada
  useEffect(() => {
    console.warn("Evento é executado somente quando a tela é carregada");
    setPersonagem(PERSONAGEM_DEFAULT);
    BuscarPersonagem();
  }, []);

  // Evento é executado somente quando a tela é carregada
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  // Sempre acionado quando a tela é renderizada
  useEffect(() => {
    console.warn("Sempre acionado quando a tela é renderizada");
  });

  // Acionado somente quando o total de personagens é atualizado
  useEffect(() => {
    console.warn("Acionado somente quando o total de personagens é atualizado");
  }, [totalPersonagens]);

  const Personagem = ({item, evento, link}) => (
    <View>
      <Pressable onPress={evento}>
        <Image
          style={Estilos.imagemPersonagem}
          source={{
            uri: link,
          }}
        />
        <Text style={Estilos.paragraph}>{item.name}</Text>
      </Pressable>
    </View>
  );

  const PersonagemItem = ({item}) => (
    <Personagem
      item={item}
      evento={() => {
        setName(item.name);
        setDescription(item.description === "" ? "Personagem sem descrição" : item.description);
        setModalVisible(true);
      }}
      link={item.thumbnail.path + "/portrait_uncanny.jpg"}/>
  );

  return (
    <SafeAreaView style={Estilos.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={Estilos.centeredView}>
          <View style={Estilos.modalView}>
            <Text style={Estilos.modalTextTitle}>{name}</Text>
            <Text style={Estilos.modalText}>{description}</Text>
            <View style={Estilos.button}>
              <Button onPress={() => setModalVisible(!modalVisible)} title="Fechar"/>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={Estilos.personagem}></Text>
      <Text style={Estilos.personagem}>Pesquisar Personagem:</Text>
      <TextInput
        autoCorrect={false}
        style={Estilos.textInput}
        clearButtonMode="always"
        placeholder={"Ex: " + PERSONAGEM_DEFAULT}
        onChangeText={(value) => setPersonagem(value)}
        onEndEditing={e => BuscarPersonagem()}
      />
      <View style={Estilos.button}>
        <Button title="Pesquisar" onPress={() => {
          BuscarPersonagem()
        }}/>
      </View>
      <View style={{marginTop: 10}}>
        <ActivityIndicator size="large" animating={activity}/>
      </View>
      <Text style={Estilos.personagem}>{totalPersonagens} Personagens Encontrados</Text>
      <FlatList
        style={{marginTop: 10}}
        data={jsonData}
        renderItem={PersonagemItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );

};

export default App;
