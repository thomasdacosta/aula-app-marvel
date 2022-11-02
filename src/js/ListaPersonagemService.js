export const PERSONAGEM_DEFAULT = "wolverine";

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

const MarvelApiClient = async (personagem, ExibirBusca, setActivity, setJsonData, setTotalPersonagens) => {
  const url = "http://gateway.marvel.com/v1/public/" +
    "characters?ts=1" +
    "&apikey=f59dbe01285f1d360542b5c47a9516e3" +
    "&hash=0ea6be79e04ac1b0400d65ffc11088f9" +
    "&nameStartsWith=" + personagem + "&orderBy=name&limit=100";

  setActivity(true);
  await fetch(url, {
    method: "GET",
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((result) => {
        if (result.data.results.length === 0)
          ExibirBusca(JSON_RETORNO_VAZIO, 0, setJsonData, setTotalPersonagens);
        else
          ExibirBusca(result.data.results, result.data.results.length, setJsonData, setTotalPersonagens);
      });
    } else
      ExibirBusca(JSON_RETORNO_VAZIO, 0, setJsonData, setTotalPersonagens);
  }).catch(() => ExibirBusca(JSON_RETORNO_VAZIO, 0, setJsonData, setTotalPersonagens));
  setActivity(false);
};

const ExibirBusca = (json, total, setJsonData, setTotalPersonagens) => {
  setJsonData(json);
  setTotalPersonagens(total);
};

export default (personagem, setTotalPersonagens, setJsonData, setActivity) => {
  setTotalPersonagens(0);
  setJsonData(null);
  MarvelApiClient(personagem, ExibirBusca, setActivity, setJsonData, setTotalPersonagens).then(() => {});
};
