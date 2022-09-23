import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";

import Estilos from "../estilos/Estilos";
import PersonagemItem from "../componentes/PersonagemItem";
import MarvelApiClient from "../componentes/MarvelApiClient";

export default () => {
  const PERSONAGEM_DEFAULT = "thor";

  const [jsonData, setJsonData] = useState("");
  const [personagem, setPersonagem] = useState(PERSONAGEM_DEFAULT);
  const [activity, setActivity] = useState(false);
  const [totalPersonagens, setTotalPersonagens] = useState(0);

  const URL = "http://gateway.marvel.com/v1/public/" +
    "characters?ts=1" +
    "&apikey=f59dbe01285f1d360542b5c47a9516e3" +
    "&hash=0ea6be79e04ac1b0400d65ffc11088f9" +
    "&nameStartsWith=" + personagem + "&orderBy=name&limit=100";

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

  useEffect(() => {
    setPersonagem(PERSONAGEM_DEFAULT);
    BuscarPersonagem();
  }, []);

  return (
    <SafeAreaView style={Estilos.container}>
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
        <Button title="Pesquisar" onPress={() => {BuscarPersonagem()}} />
      </View>
      <View style={{ marginTop: 10 }}>
        <ActivityIndicator size="large" animating={activity} />
      </View>
      <Text style={Estilos.personagem}>{totalPersonagens} Personagens Encontrados</Text>
      <FlatList
        style="marginTop: 100"
        data={jsonData}
        renderItem={PersonagemItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
