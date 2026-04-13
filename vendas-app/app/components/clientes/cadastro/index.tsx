"use client"

import { Cliente } from "@/app/models/clientes";
import { Layout } from "../../layout"
import { ClienteForm } from "./form"
import { useState } from "react"

export const CadastroCliente : React.FC = () => {

    const [cliente, setCliente] = useState<Cliente>({});

    const handleSubmit = (cliente : Cliente) => {
        console.log(cliente);
    }

    return (
        <Layout titulo="Cadastro de Cliente">
            <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
        </Layout>
    )
}