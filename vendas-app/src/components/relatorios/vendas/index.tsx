"use client";

import { Layout } from "../../layout";
import { Formik, useFormik } from "formik";
import { AutoComplete, AutoCompleteSelectEvent } from "primereact/autocomplete";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Page } from "@/src/app/models/common/page";
import { Cliente } from "@/src/app/models/clientes";
import { useState } from "react";
import { useClienteService, useVendasService } from "@/src/app/services";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputDate } from "../../common";
import { blob } from "stream/consumers";

interface RelatorioVendasForms {
    cliente: Cliente;
    dataInicio: string;
    dataFim: string;
}

export const RelatorioVendas: React.FC = () => {


    const clienteService = useClienteService();
    const vendaService = useVendasService();
    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content: [], first: 0, number: 0, size: 0, totalElements: 0
    });

    const handleClienteAutoComplete = (e: AutoCompleteCompleteEvent) => {
        const nome = e.query
        clienteService.find(nome, '', 0, 20).then(clientes => setListaClientes(clientes))
    }

    const handleSubmit = (formData: RelatorioVendasForms) => {
        vendaService.gerarRelatorioVendas(formData.cliente?.id, formData.dataInicio, formData.dataFim).then(blob => {
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL)
        })
    }

    const formik = useFormik<RelatorioVendasForms>({
        onSubmit: handleSubmit,
        initialValues: { cliente: null, dataFim: '', dataInicio: '' }
    })

    return (
        <Layout titulo="Relatório de Vendas">
            <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid w-full">
                    <div className="field">
                        <label htmlFor="cliente"> Cliente: *</label>
                        <AutoComplete id="cliente" name="cliente" suggestions={listaClientes.content} completeMethod={handleClienteAutoComplete}
                            value={formik.values.cliente} field="nome" onChange={e => formik.setFieldValue("cliente", e.value)} />

                    </div>

                      <div className="field grid align-items-end">
                        <div className="col">
                            <InputDate id="dataInicio" name="dataInicio" label="Data Inicio" value={formik.values.dataInicio} onChange={formik.handleChange} />
                        </div>
                        <div className="col">
                            <InputDate id="dataFim" name="dataFim" label="Data Fim" value={formik.values.dataFim} onChange={formik.handleChange} />
                        </div>
                      </div>

                      <Button label="Gerar Relatório" type="submit" />

                </div>

            </form>

        </Layout>
    )
}