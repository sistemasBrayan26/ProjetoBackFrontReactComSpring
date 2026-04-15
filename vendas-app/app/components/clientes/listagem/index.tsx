"use client";

import { Layout } from "../../layout";
import { Input, InputCPF } from "../../common";
import { useFormik } from "formik";
import { useState } from "react";
import { Cliente } from "@/app/models/clientes";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog , confirmDialog } from "primereact/confirmdialog";
import { Page } from "@/app/models/common/page";
import { useClienteService } from "@/app/services";
import { useEffect } from "react";
import { DataTableStateEvent } from "primereact/datatable";
import { useRouter } from "next/navigation";

interface ConsultaClientesForm {
  nome?: string;
  cpf?: string;
}

export const ListagemClientes: React.FC = () => {

  const service = useClienteService();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [clientes, setClientes] = useState<Page<Cliente>>({
    content : [],
    first : 0,
    number: 0, 
    size: 5, 
    totalElements : 0
  });

  const handleSubmit = (filtro: ConsultaClientesForm) => {
    handlePage({page: 0, rows: clientes.size} as any);
  };

  const {
    handleSubmit: formikSubmit,
    values: filtro,
    handleChange,
  } = useFormik<ConsultaClientesForm>({
    onSubmit: handleSubmit,
    initialValues: {
      nome: "",
      cpf: "",
    },
  });

  // Função de busca centralizada
  const handlePage = (event: DataTableStateEvent) => {
    setLoading(true)
    const page = event?.page ?? 0;
    const rows = event?.rows ?? (clientes.size || 5);

    service.find(filtro.nome, filtro.cpf, page, rows).then(result => {
      setClientes({...result, first: page * rows});
    }).finally(() => {
      setLoading(false)
    });
  };

  const deletar = (cliente : Cliente) => {
      service.deletar(cliente.id).then(result => {
        handlePage({page: 0, rows: clientes.size} as any);
      })
  }

  const actionTemplate = (registro: Cliente) => {
    const url = `/cadastros/clientes/${registro.id}`
  return (
    <div className="!flex !gap-4"> {/* Tailwind para espaçamento */}
      <Button 
        icon="pi pi-pencil" // Ícones do PrimeIcons que você já importou
        rounded 
        severity="info" 
        tooltip="Editar" onClick={e => router.push(url)}
      />
      <Button 
        icon="pi pi-trash" 
        rounded 
        severity="danger" 
        tooltip="Deletar" onClick={ e => {
          confirmDialog({
            message : "Confirma a exclusão deste registro?",
            acceptLabel: "Sim", rejectLabel: "Não", accept: () => deletar(registro),
            header : "Confirmação"
          })
        }}
      />
    </div>
  )
}

  // Carregar dados ao entrar na tela
  useEffect(() => {
    handlePage({page: 0, rows: clientes.size} as any);
  }, []);

  return (
    <Layout titulo="Consulta de Clientes">
      
      <form onSubmit={formikSubmit}>
        <div className="columns">
          <Input
            id="nome"
            name="nome"
            value={filtro.nome}
            label="Nome"
            columnClasses="is-half"
            onChange={handleChange}
          />
          <InputCPF
            id="cpf"
            name="cpf"
            value={filtro.cpf}
            label="CPF"
            columnClasses="is-half"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="field is-grouped">
          <div className="control is-link">
            <button type="submit" className="button is-success">
              Consultar
            </button>
          </div>
          <div className="control is-link">
            <button type="submit" onClick={ e => router.push("/cadastros/clientes")} className="button is-warning">
              Novo
            </button>
          </div>
        </div>
      </form>
      <br />

      <ConfirmDialog />

      <div className="columns">
        <div className="column is-full">
          <DataTable value={clientes.content} totalRecords={clientes.totalElements} lazy
          paginator first={clientes.first || 0} rows={clientes.size} onPage={handlePage} loading={loading}
          emptyMessage={"Nenhum registro encontrado"} dataKey="id">
              <Column field="id" header="Código" />
              <Column field="nome" header="Nome" />
              <Column field="cpf" header="CPF" />
              <Column field="email" header="E-mail" />
              <Column body={actionTemplate} />
          </DataTable>
        </div>
      </div>

    </Layout>
  );
};
