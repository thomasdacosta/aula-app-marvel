import Personagem from "./Personagem";

export default ({item}) => (
  <Personagem
    item={item}
    evento={() => alert(item.description === "" ? "Personagem sem descrição" : item.description)}
    link={item.thumbnail.path + "/portrait_uncanny.jpg"}/>
);
