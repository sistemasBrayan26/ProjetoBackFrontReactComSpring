"use client"

import { Cliente } from "@/src/app/models/clientes";
import { Layout } from "../../layout"
import { ClienteForm } from "./form"
import { useState, useEffect } from "react"
import { useClienteService } from "@/src/app/services";
import { Alert } from "../../common/message";
import { useRouter, useParams } from "next/navigation";

export const CadastroCliente: React.FC = () => {

    const [cliente, setCliente] = useState<Cliente>({});
    const [messages, setMessages] = useState<Array<Alert>>([])

    const service = useClienteService();
    const router = useRouter();
    const params = useParams();
    const queryId = params?.id;


    useEffect(() => {
        if (queryId){
            service.carregarCliente(String(queryId)).then(clienteFiltrado => {
                setCliente(clienteFiltrado)
            })
        }

    }, [queryId])

    const handleSubmit = (cliente: Cliente) => {

        if (cliente.id) {
            service.atualizar(cliente).then(response => {
                setMessages([{
                    tipo: "success", texto: "Cliente atualizado com sucesso!"
                }])
            })
        } else {
            service.salvar(cliente).then(clienteSalvo => {
                setCliente(clienteSalvo);
                setMessages([{
                    tipo: "success", texto: "Cliente salvo com sucesso!"
                }])
            })
        }

    }

    return (
        <Layout titulo="Cadastro de Cliente" mensagens={messages}>
            <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
        </Layout>
    )
}