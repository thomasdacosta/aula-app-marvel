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

export default async (url, exibir) => {
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

