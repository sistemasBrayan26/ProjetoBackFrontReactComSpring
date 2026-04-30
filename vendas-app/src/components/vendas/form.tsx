"use client";

import { Cliente } from "@/app/models/clientes";
import { Page } from "@/app/models/common/page";
import { ItemVenda, Venda } from "@/app/models/vendas";
import { useClienteService } from "@/app/services";
import { useProdutoService } from "@/app/services";
import { useFormik } from "formik";
import { AutoComplete, AutoCompleteSelectEvent } from "primereact/autocomplete";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Produto } from "@/app/models/produtos";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { validationScheme } from "./validationScheme";
import { InputDate } from "../common";

const formatorMoney = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
  onNovaVenda: () => void;
  vendaRealizada: boolean;
}

const formScheme: Venda = {
  cliente: undefined,
  itens: [],
  total: 0,
  formaPagamento: "",
};

export const VendasForm: React.FC<VendasFormProps> = ({
  onSubmit,
  vendaRealizada,
  onNovaVenda,
}) => {
  const formasPagamento: String[] = ["DINHEIRO", "CARTAO"];
  const clienteService = useClienteService();
  const produtoService = useProdutoService();
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [listaFiltradaProdutos, setListaFiltradaProdutos] = useState<Produto[]>(
    [],
  );
  const [mensagem, setMensagem] = useState<string>("");
  const [codigoProduto, setCodigoProduto] = useState<string>("");
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0);
  const [produto, setProduto] = useState<Produto>(null);

  const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 0,
    totalElements: 0,
  });

  const formik = useFormik<Venda>({
    onSubmit,
    initialValues: formScheme,
    validationSchema: validationScheme,
  });

  const handleClienteAutoComplete = (e: AutoCompleteCompleteEvent) => {
    const nome = e.query;
    clienteService
      .find(nome, "", 0, 20)
      .then((clientes) => setListaClientes(clientes));
  };

  const handleCodigoProdutoSelect = () => {
    if (codigoProduto) {
      produtoService
        .carregarProduto(codigoProduto)
        .then((produtoEncontrado) => setProduto(produtoEncontrado))
        .catch((err) => {
          setMensagem("Produto não encontrado!");
        });
    }
  };

  const handleAddProduto = () => {
    // 1. Criamos uma cópia do array atual para não mutar o estado diretamente
    const itensAtualizados = [...(formik.values.itens ?? [])];

    const indexExistente = itensAtualizados.findIndex(
      (iv: ItemVenda) => iv.produto.id === produto.id,
    );

    if (indexExistente !== -1) {
      // 2. Se já existe, criamos uma cópia do item e incrementamos
      const itemExistente = itensAtualizados[indexExistente];
      itensAtualizados[indexExistente] = {
        ...itemExistente,
        quantidade: itemExistente.quantidade + quantidadeProduto,
      };
    } else {
      // 3. Se não existe, adicionamos o novo item
      itensAtualizados.push({
        produto: produto,
        quantidade: quantidadeProduto,
      });
    }

    // 4. USAR O SETFIELDVALUE PARA O FORMIK NOTAR A MUDANÇA
    formik.setFieldValue("itens", itensAtualizados);
    const total = calcularTotal(itensAtualizados);
    formik.setFieldValue("total", total);

    // Limpeza dos campos
    setProduto(null);
    setCodigoProduto("");
    setQuantidadeProduto(0);
  };

  const dialogMensagemFooter = () => {
    return (
      <div>
        <Button label="ok" onClick={handleFecharDialogProdutoNaoEncontrado} />
      </div>
    );
  };

  const disableAddProdutoButton = () => {
    return !produto || !quantidadeProduto;
  };

  const handleFecharDialogProdutoNaoEncontrado = () => {
    setMensagem("");
    setCodigoProduto("");
    setProduto(null);
  };

  const handleProdutoAutoComplete = async (e: AutoCompleteCompleteEvent) => {
    const nomeProduto = e.query;

    if (!listaProdutos.length) {
      const produtosEncontrados = await produtoService.listar();
      setListaProdutos(produtosEncontrados);
    }

    const produtosEncontrados = listaProdutos.filter((produto: Produto) => {
      return produto.nome?.toUpperCase().includes(nomeProduto.toUpperCase());
    });

    setListaFiltradaProdutos(produtosEncontrados);
  };

  const calcularTotal = (itens: ItemVenda[]) => {
    if (!itens || itens.length === 0) {
      return 0;
    }

    return itens.reduce((somatoria, item) => {
      return somatoria + item.quantidade * item.produto.preco;
    }, 0);
  };

  const realizarNovaVenda = () => {
    onNovaVenda();
    formik.resetForm();
    formik.setFieldValue("itens", []);
    formik.setFieldTouched("itens", false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid w-full">
        <div className="field">
          <label htmlFor="cliente"> Cliente: *</label>
          <AutoComplete
            id="cliente"
            name="cliente"
            suggestions={listaClientes.content}
            completeMethod={handleClienteAutoComplete}
            value={formik.values.cliente}
            field="nome"
            onChange={(e) => formik.setFieldValue("cliente", e.value)}
          />
          <small className="help is-danger">{formik.errors.cliente}</small>
        </div>
        <br />

        <div className="field grid align-items-end">
          <div className="col-2">
            <FloatLabel>
              <InputText
                id="produto"
                onChange={(e) => setCodigoProduto(e.target.value)}
                value={codigoProduto}
                onBlur={handleCodigoProdutoSelect}
              />
              <label htmlFor="produto">Código</label>
            </FloatLabel>
          </div>

          <div className="col-5">
            <AutoComplete
              value={produto}
              field="nome"
              id="produto"
              name="produto"
              suggestions={listaFiltradaProdutos}
              completeMethod={handleProdutoAutoComplete}
              onChange={(e) => setProduto(e.value)}
            />
          </div>

          <div className="col-2">
            <FloatLabel>
              <InputText
                id="qtdProduto"
                value={quantidadeProduto}
                onChange={(e) =>
                  setQuantidadeProduto(parseInt(e.target.value) || 0)
                }
              />
              <label htmlFor="qtdProduto">QTD</label>
            </FloatLabel>
          </div>

          <div className="col-2">
            <Button
              type="button"
              label="Adicionar"
              onClick={handleAddProduto}
              disabled={disableAddProdutoButton()}
            />
          </div>

          <div className="col-12">
            <DataTable
              value={formik.values.itens}
              emptyMessage="Nenhum produto selecionado"
            >
              <Column
                body={(item: ItemVenda) => {
                  const handleRemoverItem = () => {
                    const novaLista = formik.values.itens?.filter(
                      (iv) => iv.produto.id !== item.produto.id,
                    );
                    formik.setFieldValue("itens", novaLista);
                  };

                  return (
                    <Button
                      type="button"
                      label="Excluir"
                      onClick={handleRemoverItem}
                    />
                  );
                }}
              />
              <Column field="produto.id" header={"Código"} />
              <Column field="produto.sku" header={"SKU"} />
              <Column field="produto.nome" header={"Produto"} />
              <Column field="produto.preco" header={"Preço Unitário"} />
              <Column field="quantidade" header={"QTD"} />
              <Column
                header="Total"
                body={(iv: ItemVenda) => {
                  const total = iv.produto.preco * iv.quantidade;
                  const totalFormatado = formatorMoney.format(total);
                  return <div>{totalFormatado}</div>;
                }}
              />
            </DataTable>
            <small className="help is-danger">
              {formik.touched && formik.errors.itens}
            </small>
          </div>

          <div className="col-5">
            <label htmlFor="formaPagamento">Forma de Pagamento: *</label>
            <Dropdown
              id="formaPagamento"
              options={formasPagamento}
              value={formik.values.formaPagamento}
              onChange={(e) => formik.setFieldValue("formaPagamento", e.value)}
              placeholder="Selecione ..."
            />
            <small className="help is-danger">
              {formik.errors.formaPagamento}
            </small>
          </div>

          <div className="col-2">
            <label htmlFor="itens">Itens: </label>
            <InputText disabled value={formik.values.itens?.length} />
          </div>

          <div className="col-4">
            <label htmlFor="totalVenda">Total: </label>
            <InputText
              disabled
              value={formatorMoney.format(formik.values.total)}
            />
          </div>
        </div>
        {!vendaRealizada && <Button type="submit" label="Finalizar" />}
        {vendaRealizada && (
          <Button
            type="button"
            label="Nova Venda"
            severity="success"
            onClick={realizarNovaVenda}
          />
        )}
      </div>

      <Dialog
        header="Atenção"
        position="top"
        visible={!!mensagem}
        onHide={handleFecharDialogProdutoNaoEncontrado}
        footer={dialogMensagemFooter}
      >
        {mensagem}
      </Dialog>
    </form>
  );
};
