"use client"
import { Cliente } from "@/src/app/models/clientes"
import { useFormik } from "formik";
import { Input, InputCPF, InputTelefone, InputDate } from "../../common";
import { validationScheme } from "./validationSchema";
import { useRouter } from "next/navigation"; 

interface ClienteFormProps {
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
    dataCadastro: '',
    cpf: '',
    nascimento: '',
    email: '',
    endereco: '',
    id: '',
    nome: '',
    telefone: ''
}

export const ClienteForm: React.FC<ClienteFormProps> = ({
    cliente, onSubmit }
) => {

    const router = useRouter();

    const formik = useFormik<Cliente>({
        initialValues: { ...formScheme, ...cliente },
        onSubmit, enableReinitialize: true, 
        validationSchema : validationScheme
    })

    const caixaAlta = (value: string) => {
        return value.toUpperCase();
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            {
                formik.values.id && <div className="columns">
                    <Input id="id" name="id" onChange={formik.handleChange} value={formik.values.id} label="Código: *" autoComplete="off" columnClasses="is-half" disabled />
                    <InputDate id="dataCadastro" name="dataCadastro" onChange={formik.handleChange} value={formik.values.dataCadastro} label="Data Cadastro: *" autoComplete="off"
                        columnClasses="is-half" disabled />
                </div>
            }

            <div className="columns">
                <Input id="nome" name="nome" onChange={formik.handleChange} value={formik.values.nome} label="Nome: *" autoComplete="off" columnClasses="is-full" 
                formatter={caixaAlta} error={formik.errors.nome}/>
            </div>
            <div className="columns">
                <InputCPF id="cpf" name="cpf" onChange={formik.handleChange} value={formik.values.cpf} label="CPF: *" autoComplete="off" columnClasses="is-half"
                error={formik.errors.cpf} />
                <InputDate id="nascimento" name="nascimento" onChange={formik.handleChange} value={formik.values.nascimento} label="Data Nascimento: *" autoComplete="off"
                    columnClasses="is-half" error={formik.errors.nascimento} />
            </div>
            <div className="columns">
                <Input id="endereco" name="endereco" onChange={formik.handleChange} value={formik.values.endereco} label="Endereço: *" autoComplete="off" columnClasses="is-full"
                formatter={caixaAlta} error={formik.errors.endereco} />
            </div>
            <div className="columns">
                <Input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} label="E-mail: *" autoComplete="off" columnClasses="is-half"
                error={formik.errors.email} />
                <InputTelefone id="telefone" name="telefone" onChange={formik.handleChange} value={formik.values.telefone} label="Telefone: *" autoComplete="off"
                    columnClasses="is-half" error={formik.errors.telefone} />
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-success"> {formik.values.id ? "Atualizar" : "Salvar"} </button>
                </div>
                <div className="control">
                    <button type="button" className="button is-link" onClick={e => router.push("/consultas/clientes")}> Voltar </button>
                </div>

            </div>

        </form>
    )
}