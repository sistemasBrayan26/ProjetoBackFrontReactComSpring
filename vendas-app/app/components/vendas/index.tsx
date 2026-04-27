"use client";

import { Venda } from "@/app/models/vendas";
import { Layout } from "../layout";
import { VendasForm } from "./form";
import { useVendasService } from "@/app/services";
import { Alert } from "../common/message";
import { useState } from "react";

export const Vendas : React.FC = () => {

    const useVendaService = useVendasService();
    const [messages, setMessages] = useState<Alert[]>([]);
    const [vendaRealizada, setVendaRealizada] = useState<boolean>(false);

    const handleNovaVenda = () => {
        setVendaRealizada(false);
        setMessages([]);
    }

    const handleSubmit = (venda : Venda) => {
        useVendaService.realizarVenda(venda).then(response => {
            setMessages([{texto: "Venda realizada com sucesso!", tipo : "success"}])
            setVendaRealizada(true)
        }).catch(error => setMessages([{"texto" : "Ocorreu um erro, entre em contato com a administração" + error, tipo : "warning"}]))
    }

    return (
        <Layout titulo="Emissão de Venda" mensagens={messages}>
            <VendasForm onSubmit={handleSubmit} vendaRealizada={vendaRealizada} onNovaVenda={handleNovaVenda} />

        </Layout>
    )
}