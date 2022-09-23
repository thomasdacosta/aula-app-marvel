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
// import BuscarPersonagem from "../componentes/BuscarPersonagem";

const App = () => {
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

  const ExibirBusca = (json, total) => {
    setJsonData(json);
    setTotalPersonagens(total);
  };

  const MarvelApiClient = async (exibir) => {
    await fetch(URL, {
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

  const BuscarPersonagem = () => {
    setTotalPersonagens(0);
    setJsonData(null);
    setActivity(true);
    MarvelApiClient(ExibirBusca).then(() => {});
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

export default App;
