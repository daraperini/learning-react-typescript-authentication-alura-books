import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import imagemPrincipal from "./assets/login.png";
import { useState } from "react";
import axios from "axios";
import "./ModalCadastroUsuario.css";

interface PropsModalCadastroUsuario {
  aberta: boolean;
  aoFechar: () => void;
}

const ModalCadastroUsuario = ({
  aberta,
  aoFechar,
}: PropsModalCadastroUsuario) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");

  const aoSubmeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const usuario = {
      nome,
      email,
      senha,
      endereco,
      cep,
      complemento,
    };

    axios
      .post("http://localhost:8000/public/registrar", usuario)
      .then(() => {
        alert("Usuário foi cadastrado com sucesso!");
        setNome("");
        setEmail("");
        setEndereco("");
        setComplemento("");
        setCep("");
        setSenha("");
        setSenhaConfirmada("");
        aoFechar();
      })
      .catch(() => {
        alert("OPS! Alguma coisa deu errado!");
      });
  };

  return (
    <AbModal titulo="Cadastrar" aberta={aberta} aoFechar={aoFechar}>
      <div className="corpoModalCadastro">
        <figure>
          <img
            src={imagemPrincipal}
            alt="Monitor com uma fechadura e uma pessoa com uma chave logo ao lado"
          />
        </figure>
        <form onSubmit={(evento) => aoSubmeterFormulario(evento)}>
          <AbCampoTexto
            label="Nome"
            value={nome}
            onChange={setNome}
            type="text"
          />
          <AbCampoTexto
            label="E-mail"
            value={email}
            onChange={setEmail}
            type="email"
          />
          <AbCampoTexto
            label="Endereço"
            value={endereco}
            onChange={setEndereco}
            type="text"
          />
          <AbCampoTexto
            label="Complemento"
            value={complemento}
            onChange={setComplemento}
            type="text"
          />
          <AbCampoTexto label="CEP" value={cep} onChange={setCep} type="text" />
          <AbCampoTexto
            label="Senha"
            value={senha}
            onChange={setSenha}
            type="password"
          />
          <AbCampoTexto
            label="Confirmar Senha"
            value={senhaConfirmada}
            onChange={setSenhaConfirmada}
            type="password"
          />
          <footer>
            <AbBotao texto="Cadastrar" />
          </footer>
        </form>
      </div>
    </AbModal>
  );
};

export default ModalCadastroUsuario;
