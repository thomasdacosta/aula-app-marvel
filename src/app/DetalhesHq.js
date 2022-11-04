import React from "react";
import { Button, Image, Linking, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Estilos from "../estilos/Estilos";

const App = ({ route, navigation }) => {
  const { item } = route.params;

  let data = new Date(Date.parse(item?.modified));
  let dataFormatada = new Intl.DateTimeFormat('pt-BR',
    { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    .format(data);

  return (
    <SafeAreaView style={Estilos.safeAreaView}>
      <ScrollView>
        <View style={Estilos.alignVertical}>
          <View style={{ flex: 0.1 }} />
          <Text style={Estilos.detalhePersonagem}>{item.title}</Text>
        </View>
        <Image
          style={Estilos.imagemPersonagem}
          source={{
            uri: item.thumbnail.path + "/portrait_uncanny.jpg",
          }}
        />
        <View><Text></Text></View>
        <View><Text></Text></View>
        <View style={Estilos.linha} />
        <Text
          style={Estilos.detalheDescricaoPersonagemAmarelo}>Descrição: </Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.description === "" ? item?.title : item?.description}</Text>
        <View><Text></Text></View>
        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>Data de Modificação:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{dataFormatada + "\r\n"}</Text>


        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>Número da Edição:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.issueNumber + "\r\n"}</Text>

        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>Número de Páginas:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.pageCount + "\r\n"}</Text>

        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>Formato:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.format + "\r\n"}</Text>

        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>ISBN:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.isbn + "\r\n"}</Text>

        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>UPC:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.upc + "\r\n"}</Text>

        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>ID:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.id + "\r\n"}</Text>

        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>Digital ID:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.digitalId + "\r\n"}</Text>

        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>EAN:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.ean + "\r\n"}</Text>

        <View style={Estilos.linha} />
        <Text style={Estilos.detalheDescricaoPersonagemAmarelo}>ISSN:</Text>
        <Text style={Estilos.detalheDescricaoPersonagem}>{item?.issn + "\r\n"}</Text>



        <View style={{ flex: 0.1 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
