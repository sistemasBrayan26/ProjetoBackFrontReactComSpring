"use client";

import { Layout, Input, InputMoney } from "@/app/components";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProdutoService } from "@/app/services";
import { Produto } from "@/app/models/produtos";
import { converterEmBigDecimal, formatReal } from "@/app/util/money";
import { Alert } from "../../common/message";
import * as yup from "yup";
import Link from "next/link";

const msgCampoObrigatorio = " campo obrigatório.";

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msgCampoObrigatorio),
  nome: yup.string().trim().required(msgCampoObrigatorio),
  descricao: yup.string().trim().required(msgCampoObrigatorio),
  preco: yup
    .number()
    .required(msgCampoObrigatorio)
    .moreThan(0, "Valor deve ser maior que 0,00(Zero)"),
});

export const CadastroProdutos: React.FC = () => {
  const service = useProdutoService();

  const [sku, setSku] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [id, setId] = useState<string | undefined>("");
  const [dataCadastro, setDataCadastro] = useState<string | undefined>("");
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const [errors, setErrors] = useState<formErros>({});
  const router = useRouter();
  const params = useParams();
  const queryId = params?.id;

  useEffect(() => {
    if (queryId) {
      service.carregarProduto(String(queryId)).then((produtoEncontrado) => {
        console.log(produtoEncontrado);
        setId(produtoEncontrado.id);
        setSku(produtoEncontrado.sku ?? "");
        setNome(produtoEncontrado.nome ?? "");
        setPreco(formatReal(`${produtoEncontrado.preco}`));
        setDescricao(produtoEncontrado.descricao ?? "");
        setDataCadastro(produtoEncontrado.dataCadastro ?? "");
      });
    }
  }, [queryId]);

  const submit = () => {
    const produto: Produto = {
      sku,
      preco: converterEmBigDecimal(preco),
      nome,
      descricao,
      id,
      dataCadastro,
    };

    validationSchema
      .validate(produto)
      .then((obj) => {
        setErrors({});
        if (id) {
          service.atualizar(produto).then((response) => {
            setMessages([
              {
                tipo: "success",
                texto: "Produto atualizado com sucesso!",
              },
            ]);
          });
        } else {
          service.salvar(produto).then((produtoResposta) => {
            setId(produtoResposta.id);
            setDataCadastro(produtoResposta.dataCadastro);
            setMessages([
              {
                tipo: "success",
                texto: "Produto cadastrado com sucesso!",
              },
            ]);
          });
        }
      })
      .catch((err) => {
        const field = err.path;
        const message = err.message;

        setErrors({
          [field]: message,
        });
      });
  };

  interface formErros {
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
  }

  return (
    <Layout titulo="Produtos" mensagens={messages}>
      {id && (
        <div className="columns">
          <Input
            label="Código: "
            id="inputId"
            columnClasses="is-half"
            value={id}
            disabled
          />
          <Input
            label="Data Cadastro: "
            id="inputDataCadastro"
            columnClasses="is-half"
            value={dataCadastro}
            disabled
          />
        </div>
      )}

      <div className="columns">
        <Input
          label="SKU: *"
          id="inputSku"
          columnClasses="is-half"
          value={sku}
          onChange={e => setSku(e.target.value)}
          placeholder="Digite o SKU do produto"
          error={errors.sku}
        />
        <InputMoney
          label="Preço: *"
          id="inputPreco"
          columnClasses="is-half"
          value={preco}
          onChange={e => setPreco(e.target.value)}
          placeholder="Digite o preço do produto"
          maxLength={16}
          error={errors.preco}
        />
      </div>

      <div className="columns">
        <Input
          label="Nome: *"
          id="inputNome"
          columnClasses="is-full"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Digite o nome do produto"
          error={errors.nome}
        />
      </div>

      <div className="field">
        <label htmlFor="inputdescricao" className="label">
          {" "}
          Descrição: *
        </label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Digite a descrição do produto"
            id="inputdescricao"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
          {errors.descricao && (
            <p className="help is-danger">{errors.descricao}</p>
          )}
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" onClick={submit}>
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <Link href={"/consultas/produtos"}>
            <button className="button is-danger">Voltar</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
