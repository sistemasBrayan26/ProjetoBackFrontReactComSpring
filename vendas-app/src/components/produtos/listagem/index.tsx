"use client";

import { Layout } from "../../layout";
import { Loader } from "../../common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TabelaProdutos } from "./tabela";
import { Produto } from "@/src/app/models/produtos";
import useSWR from "swr";
import { httpClient } from "@/src/app/http";
import { AxiosResponse } from "axios";
import { useProdutoService } from "@/src/app/services";
import { Alert } from "../../common/message";
import { useState } from "react";
import { useEffect } from "react";

export const ListagemProdutos: React.FC = () => {
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const service = useProdutoService();

  const router = useRouter();
  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "/api/produtos",
    (url: string) => httpClient.get<Produto[]>(url),
  );

  const [lista, setLista] = useState<Produto[]>([]);

  useEffect(() => {
    setLista(result?.data || []);
  }, [result]);

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos/${produto.id}`;
    router.push(url);
  };

  const excluir = (produto: Produto) => {
    service.deletar(produto.id).then((response) => {
      setMessages([
        { tipo: "success", texto: "Produto excluido com sucesso!" },
      ]);
      const listaAlterada: Produto[] = lista?.filter(
        (p) => p.id !== produto.id,
      );
      setLista(listaAlterada);
    });
  };

  return (
    <Layout titulo="Listagem de Produtos" mensagens={messages}>
      <Link href={"/cadastros/produtos"}>
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <br />
      <Loader show={!result} />
      <TabelaProdutos onEdit={editar} onDelete={excluir} produtos={lista} />
    </Layout>
  );
};
