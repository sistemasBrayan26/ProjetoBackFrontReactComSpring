import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
    cliente: Yup.mixed()
        .required("Campo obrigatório")
        .test("is-object", "Selecione um cliente da lista", (value) => {
            // Se for string (digitando), ele falha na validação final
            // Se for objeto (selecionado), ele passa
            return typeof value === 'object' && value !== null;
        }),
    itens: Yup.array().min(1, "Você deve adicionar pelo menos um item."),
    formaPagamento : Yup.string().trim().required("Campo obrigatório")
})