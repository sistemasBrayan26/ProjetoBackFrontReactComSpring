"use client"

import { Layout, Input, Message } from '@/app/components'
import { useState } from 'react'
import { useProdutoService } from '@/app/services'
import { Produto } from '@/app/models/produtos'
import { converterEmBigDecimal } from '@/app/util/money'
import { Alert } from '../../common/message'
import * as yup from 'yup'

const msgCampoObrigatorio = " campo obrigatório."

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim().required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00(Zero)")
})


export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()

    const [sku, setSku] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [id, setId] = useState<string | undefined>('')
    const [dataCadastro, setDataCadastro] = useState<string | undefined>('')
    const [messages, setMessages] = useState<Array<Alert>>([])

    const submit = () => {
        const produto: Produto = {
            sku, preco: converterEmBigDecimal(preco), nome, descricao, id, dataCadastro
        }

        validationSchema.validate(produto).then(obj => {
            if (id) {
                service.atualizar(produto).then(response => {
                    setMessages([{
                        tipo: "success", texto: "Produto atualizado com sucesso!"
                    }])
                })
            } else {
                service.salvar(produto).then(produtoResposta => {
                    setId(produtoResposta.id)
                    setDataCadastro(produtoResposta.dataCadastro)
                    setMessages([{
                        tipo: "success", texto: "Produto cadastrado com sucesso!"
                    }])
                })
            }
        })
            .catch(err => {
                const field = err.path;
                const message = err.message;

                setMessages([{
                    tipo : "danger", field, texto: message
                }])
            })
    }


    return (
        <Layout titulo="Produtos" mensagens={messages}>
            {id &&
                <div className='columns'>
                    <Input label='Código: ' id='inputId' columnClasses='is-half' value={id} disabled />
                    <Input label='Data Cadastro: ' id='inputDataCadastro' columnClasses='is-half' value={dataCadastro} disabled />
                </div>
            }

            <div className='columns'>
                <Input label='SKU: *' id='inputSku' columnClasses='is-half' value={sku} onChange={setSku} placeholder='Digite o SKU do produto' error='Campo inválido' />
                <Input label='Preço: *' id='inputPreco' columnClasses='is-half' value={preco} onChange={setPreco} placeholder='Digite o preço do produto'
                    currency={true} maxLength={16} />
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
                    <button className='button is-primary' onClick={submit}>{id ? "Atualizar" : "Salvar"}</button>
                </div>
                <div className='control'>
                    <button className='button is-danger'>Voltar</button>
                </div>
            </div>

        </Layout>
    )
}