"use client"

import { Layout, Input } from '@/app/components'
import { useState } from 'react'
import { useProdutoService } from '@/app/services'
import { Produto } from '@/app/models/produtos'


export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()

    const [ sku, setSku] = useState<string>('')
    const [ preco, setPreco] = useState<string>('')
    const [ nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')

    const submit = () => {
        const produto : Produto = {
            sku, preco : parseFloat(preco), nome, descricao
        }

        service.salvar(produto).then(produtoResposta => console.log(produtoResposta))
    }


    return (
        <Layout titulo="Cadastro de Produtos">

            <div className='columns'>
                <Input label='SKU: *' id='inputSku' columnClasses='is-half' value={sku} onChange={setSku} placeholder='Digite o SKU do produto' />
                <Input label='Preço: *' id='inputPreco' columnClasses='is-half' value={preco} onChange={setPreco} placeholder='Digite o preço do produto' />
            </div>

            <div className='columns'>
                <Input label='Nome: *' id='inputNome' columnClasses='is-full' value={nome} onChange={setNome} placeholder='Digite o nome do produto' /> 
            </div>



            <div className='field'>
                <label htmlFor='inputdescricao' className='label'> Descrição: *</label>
                <div className='control'>
                    <input className='textarea' type="text" placeholder='Digite a descrição do produto' id='inputdescricao' value={descricao} 
                    onChange={event => setDescricao(event.target.value)} />
                </div>
            </div>

            <div className='field is-grouped'>

                <div className='control'>
                    <button className='button is-primary' onClick={submit}>Salvar</button>
                </div>
                <div className='control'>
                    <button className='button is-danger'>Voltar</button>
                </div>
            </div>

        </Layout>
    )
}