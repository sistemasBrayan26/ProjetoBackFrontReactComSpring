import { Layout, Dashboard } from "../components";
import { useDashboardService } from "./services";
import { DashboardData, vendasPorMes } from "./models/dashboard";
import { RotaAutenticada } from "../components";

// Definimos uma interface para os dados (boa prática)
interface DashboardDataProps {
  produtos: number;
  vendas: number;
  clientes: number;
  vendasPorMes: vendasPorMes[];
}

// Transformamos em async para simular uma busca de API no futuro
export default async function Home() {
  const dashBoardService = useDashboardService();
  const dashboardData: DashboardData = await dashBoardService.get();

  return (
    <RotaAutenticada>
      <Layout titulo="Dashboard">
        <Dashboard
          clientes={dashboardData.clientes}
          produtos={dashboardData.produtos}
          vendas={dashboardData.vendas}
          vendasPorMes={dashboardData.vendasMes}
        />
      </Layout>
    </RotaAutenticada>
  );
}
