import * as Yup from 'yup';

const campoObrigatorioMensagem = "Campo obrigatório";

export const validationScheme = Yup.object().shape({
    nome : Yup.string().trim().required(campoObrigatorioMensagem),
    cpf: Yup.string().trim().required(campoObrigatorioMensagem).length(14, "CPF inválido"), 
    nascimento: Yup.string().trim().required(campoObrigatorioMensagem),
     email: Yup.string().trim().required(campoObrigatorioMensagem).email("E-mail inválido"), 
     endereco: Yup.string().trim().required(campoObrigatorioMensagem), 
     telefone: Yup.string().trim().required(campoObrigatorioMensagem)
});