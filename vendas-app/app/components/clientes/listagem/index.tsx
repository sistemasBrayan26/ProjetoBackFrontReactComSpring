"use client";

import { Layout } from "../../layout";
import { Input, InputCPF } from "../../common";
import { useFormik } from "formik";

interface ConsultaClientesForm {
  nome?: string;
  cpf?: string;
}

export const ListagemClientes: React.FC = () => {
  const handleSubmit = (filtro: ConsultaClientesForm) => {
    console.log(filtro);
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
        </div>
      </form>
    </Layout>
  );
};
