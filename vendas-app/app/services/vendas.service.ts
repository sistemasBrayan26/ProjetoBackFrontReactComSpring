import { httpClient } from "../http";
import { Venda } from "../models/vendas";

const resourceURL : string = '/api/vendas'

export const useVendasService = () => {

    const realizarVenda = async (venda : Venda) : Promise<void> =>  {
        await httpClient.post<Venda> (resourceURL, venda);
    }

    return {
        realizarVenda
    }

}