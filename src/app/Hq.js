import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Estilos from "../estilos/Estilos";
import React, { useEffect, useState } from "react";

const App = ({ route, navigation }) => {
  const { item } = route.params;
  const [jsonData, setJsonData] = useState("");
  const [activity, setActivity] = useState(false);
  const [totalHq, setTotalHq] = useState(0);
  const [totalGeralHq, setTotalGeralHq] = useState(0);

  const URL = "http://gateway.marvel.com/v1/public/characters/" + item.id + "/comics" +
    "?ts=1" +
    "&apikey=f59dbe01285f1d360542b5c47a9516e3" +
    "&hash=0ea6be79e04ac1b0400d65ffc11088f9" +
    "&orderBy=-onsaleDate";

  const MarvelApiClient = async (url, exibir) => {
    await fetch(url, {
      method: "GET",
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((result) => {
          if (result.data.results.length === 0) {
            setTotalHq(0);
            setTotalGeralHq(0);
            exibir("{}", 0);
          } else {
            setTotalHq(result.data.results.length);
            setTotalGeralHq(result.data.total);
            exibir(result.data.results, result.data.results.length);
          }
        });
      } else {
        exibir("{}", 0);
      }
      setActivity(false);
    }).catch(() => {
      exibir("{}", 0);
      setActivity(false);
    });
  };

  const ExibirBusca = (json, total) => {
    setJsonData(json);
  };

  useEffect(() => {
    setActivity(true);
    MarvelApiClient(URL, ExibirBusca).then(() => {
    });
  }, []);

  const Hq = ({ item, evento, link }) => (
    <View>
      <Pressable onPress={evento}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
          <View>
            <Text style={Estilos.personagemParagraph}>{item.title}</Text>
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
    </View>
  );

  const HqPersonagemItem = ({ item }) => (
    <Hq
      item={item}
      evento={() => {
      }}
      link={item?.thumbnail?.path + "/portrait_uncanny.jpg"} />
  );

  return (
    <SafeAreaView style={Estilos.safeAreaView}>
      <Text style={Estilos.detalhePersonagem}>HQ´s do {item.name}</Text>
      <View style={{ marginTop: 10 }}>
        <ActivityIndicator size="large" animating={activity} />
      </View>
      <Text style={Estilos.personagem}>{totalHq} de {totalGeralHq} HQ´s Encontradas</Text>
      <FlatList
        style={{ marginTop: 10 }}
        data={jsonData}
        renderItem={HqPersonagemItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
export default App;
