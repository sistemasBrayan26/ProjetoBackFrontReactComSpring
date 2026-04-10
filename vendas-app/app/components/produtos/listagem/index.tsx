"use client"

import { Layout } from "../../layout"
import { Loader } from "../../common"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import { Produto } from "@/app/models/produtos"
import useSWR from 'swr'
import { httpClient } from "@/app/http"
import { AxiosResponse } from "axios"

export const ListagemProdutos: React.FC = () => {

    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url : string) => httpClient.get<Produto[]>(url))

    const editar = (produto : Produto) => {
        console.log(produto)
    }

    const excluir = (prooduto : Produto) => {
        console.log(prooduto)
    }

    return (
        <Layout titulo="Listagem de Produtos">
            <Link href={"/cadastros/produtos"}>
                <button className="button is-warning">Novo</button>
            </Link>
            <br /><br />
             <Loader show={!result} />
            <TabelaProdutos onEdit={editar} onDelete={excluir} produtos={result?.data || []} />

        </Layout>
    )
}