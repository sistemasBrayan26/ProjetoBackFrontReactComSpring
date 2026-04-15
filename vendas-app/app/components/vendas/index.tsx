"use client";

import { Venda } from "@/app/models/vendas";
import { Layout } from "../layout";
import { VendasForm } from "./form";

export const Vendas : React.FC = () => {

    const handleSubmit = (venda : Venda) => {
        console.log(venda);
    }

    return (
        <Layout titulo="Emissão de Venda">
            <VendasForm onSubmit={handleSubmit} />

        </Layout>
    )
}