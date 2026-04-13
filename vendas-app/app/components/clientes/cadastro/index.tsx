"use client"

import { Cliente } from "@/app/models/clientes";
import { Layout } from "../../layout"
import { ClienteForm } from "./form"
import { useState } from "react"
import { useClienteService } from "@/app/services";
import { Alert } from "../../common/message";

export const CadastroCliente : React.FC = () => {

    const [cliente, setCliente] = useState<Cliente>({});
    const [messages, setMessages] = useState<Array<Alert>>([])

    const service = useClienteService();

    const handleSubmit = (cliente : Cliente) => {

        if (cliente.id){
            service.atualizar(cliente).then(response => {
                setMessages([{
                    tipo : "success", texto : "Cliente atualizado com sucesso!"
                }])
            })
        } else {
            service.salvar(cliente).then(clienteSalvo => {
                setCliente(clienteSalvo);
                setMessages([{
                    tipo : "success", texto : "Cliente salvo com sucesso!"
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