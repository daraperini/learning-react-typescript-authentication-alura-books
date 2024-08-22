import { AbBotao } from "ds-alurabooks";
import "./Pedidos.css";
import { useEffect, useState } from "react";
import { IPedido } from "../../interfaces/IPedido";
import http from "../../http";

const Pedidos = () => {
  const [listaPedidos, setListaPedidos] = useState<IPedido[]>([]);
  const formatador = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    http
      .get<IPedido[]>("pedidos")
      .then((res) => setListaPedidos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const excluirPedido = (pedido: IPedido) => {
    http
      .delete(`pedidos/${pedido.id}`)
      .then(() =>
        setListaPedidos(listaPedidos.filter((p) => p.id !== pedido.id))
      )
      .catch((err) => console.log(err));
  };

  return (
    <section className="pedidos">
      <h1>Meus pedidos</h1>
      {listaPedidos.map((pedido) => {
        return (
          <div className="pedido" key={pedido.id}>
            <ul>
              <li>
                Pedido: <strong>{pedido.id}</strong>
              </li>
              <li>
                Data do pedido:{" "}
                <strong>{new Date(pedido.data).toLocaleDateString()}</strong>
              </li>
              <li>
                Valor total: <strong>{formatador.format(pedido.total)}</strong>
              </li>
              <li>
                Entrega realizada em:{" "}
                <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong>
              </li>
            </ul>
            <AbBotao texto="Detalhes" />
            <AbBotao texto="Excluir" onClick={() => excluirPedido(pedido)} />
          </div>
        );
      })}
    </section>
  );
};

export default Pedidos;
