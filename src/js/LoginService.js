export const EMAIL = "michael.lawson@reqres.in";
export const SENHA = "cityslicka";
export const MENSAGEM_EMAIL = "Digite o seu e-mail.";
export const MENSAGEM_SENHA = "Digite a sua senha.";

const ShowModal = (description, setModalVisible, setDescription) => {
  setModalVisible(true);
  setDescription(description);
};

const ValidarCampos = (email, senha, setModalVisible, setDescription) => {
  if (email.trim().length === 0) {
    ShowModal(MENSAGEM_EMAIL, setModalVisible, setDescription);
    return false;
  }

  if (senha.trim().length === 0) {
    ShowModal(MENSAGEM_SENHA, setModalVisible, setDescription);
    return false;
  }

  return true;
}

export default async (email, senha, navigation, setActivity, setModalVisible, setDescription) => {
  if (!ValidarCampos(email, senha, setModalVisible, setDescription)) {
    return;
  }

  setActivity(true);

  let usuario = {
    "email": email, "password": senha,
  };

  await fetch("https://reqres.in/api/login", {
    method: "POST", headers: {
      Accept: "application/json", "Content-Type": "application/json",
    }, body: JSON.stringify(usuario),
  }).then(response => {
    if (response.status === 200) {
      response.text().then(function() {
        navigation.navigate("Personagem");
      });
    } else {
      ShowModal(`Usuário ou senha inválidos => código: ${response.status}`, setModalVisible, setDescription);
    }
    setActivity(false);
  }).catch((e) => {
    ShowModal("Não foi possivel executar o login =>" + e, setModalVisible, setDescription);
    setActivity(false);
  });

}
