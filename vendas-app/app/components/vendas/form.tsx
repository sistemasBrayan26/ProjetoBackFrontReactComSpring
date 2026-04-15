"use client";

import { Cliente } from "@/app/models/clientes";
import { Page } from "@/app/models/common/page";
import { Venda } from "@/app/models/vendas";
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

interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
}

const formScheme: Venda = {
    cliente: undefined, produtos: [], total: 0, formaPagamento: ''
}

export const VendasForm: React.FC<VendasFormProps> = ({
    onSubmit
}) => {

    const clienteService = useClienteService();
    const produtoService = useProdutoService();
    const [codigoProduto, setCodigoProduto] = useState<string>('');
    const [produto, setProduto] = useState<Produto>({});

    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content: [], first: 0, number: 0, size: 0, totalElements: 0
    });

    const formik = useFormik<Venda>({
        onSubmit, initialValues: formScheme
    })

    const handleClienteAutoComplete = (e: AutoCompleteCompleteEvent) => {
        const nome = e.query
        clienteService.find(nome, '', 0, 20).then(clientes => setListaClientes(clientes))
    }

    const handleCodigoProdutoSelect = () => {
        produtoService.carregarProduto(codigoProduto).then(produtoEncontrado => setProduto(produtoEncontrado)).catch(err => console.log(err))
    }

    return (
        <form onSubmit={formik.handleSubmit} >

            <div className="p-fluid w-full">
                <div className="field">
                    <label htmlFor="cliente"> Cliente: *</label>
                    <AutoComplete id="cliente" name="cliente" suggestions={listaClientes.content} completeMethod={handleClienteAutoComplete}
                        value={formik.values.cliente} field="nome" onChange={e => formik.setFieldValue("cliente", e.value)} />
                </div>

                <div className="field grid align-items-end">

                    <div className="col-2">
                        <FloatLabel >
                            <InputText id="produto" onChange={e => setCodigoProduto(e.target.value)} value={codigoProduto} onBlur={handleCodigoProdutoSelect} />
                            <label htmlFor="produto">Código</label>
                        </FloatLabel>
                    </div>

                    <div className="col-5">
                            <AutoComplete value={produto} field="nome"  />
                    </div>

                    <div className="col-2">
                        <FloatLabel>
                            <InputText id="qtdProduto" />
                            <label htmlFor="qtdProduto">QTD</label>
                        </FloatLabel>
                    </div>

                    <div className="col-2">
                        {/* O botão agora ficará na mesma linha devido ao grid */}
                        <Button type="button" label="Adicionar"  />
                    </div>

                </div>

                <Button type="submit" label="Finalizar" />

            </div>



        </form>
    )
}