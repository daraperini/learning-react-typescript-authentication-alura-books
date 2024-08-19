import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import { useState } from "react";
import imagemPrincipal from "./assets/login.png";
import "./ModalLogin.css";
import axios from "axios";
import { usePersistirToken } from "../../hooks";

interface PropsModalLogin {
  aberta: boolean;
  aoFechar: () => void;
}

const ModalLogin = ({ aberta, aoFechar }: PropsModalLogin) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const setToken = usePersistirToken();

  const aoSubmeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const usuario = {
      email,
      senha,
    };

    axios.post('http://localhost:8000/public/login', usuario).then((res) => {
        setToken(res.data.access_token)
        setEmail('')
        setSenha('')
        aoFechar()
    }).catch((erro) => {
        if(erro?.response?.data?.message) {
            alert(erro.response.data.message)
        } else {
            alert('Aconteceu um erro inesperado ao efetuar o seu login! Entre em contato com o suporte!')
        }
    })
  };

  return (
    <AbModal titulo="Login" aberta={aberta} aoFechar={aoFechar}>
      <div className="corpoModalLogin">
        <figure>
          <img
            src={imagemPrincipal}
            alt="Monitor com uma fechadura e uma pessoa com uma chave logo ao lado"
          />
        </figure>
        <form onSubmit={(evento) => aoSubmeterFormulario(evento)}>
          <AbCampoTexto
            label="E-mail"
            onChange={setEmail}
            value={email}
            type="email"
          />
          <AbCampoTexto
            label="Senha"
            onChange={setSenha}
            value={senha}
            type="password"
          />
          <footer>
            <AbBotao texto="Fazer login" />
          </footer>
        </form>
      </div>
    </AbModal>
  );
};

export default ModalLogin;
