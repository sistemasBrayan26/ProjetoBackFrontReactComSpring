export interface DashboardData {
    produtos?: number;
    clientes?: number;
    vendas?: number;
    vendasMes? : vendasPorMes[];
}

export interface vendasPorMes {
    mes?: number;
    valor?: number;

}