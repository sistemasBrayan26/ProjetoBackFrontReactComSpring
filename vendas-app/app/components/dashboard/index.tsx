"use client";

import { Chart } from "primereact/chart"; 
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { vendasPorMes } from "@/app/models/dashboard";
import { MESES } from "@/app/util/meses";

interface DashBoardProps {
    clientes? : number;
    produtos?: number; 
    vendas?: number;
    vendasPorMes? : vendasPorMes[];
}

export const Dashboard: React.FC<DashBoardProps> = (
    {clientes, produtos, vendas, vendasPorMes}
) => {

    const [chartData, setChartData] = useState({});

    const carregaDadosGrafico = () => {
        const labels : string[] = vendasPorMes?.map(vm => MESES[vm.mes - 1])
        const valores  = vendasPorMes?.map(vm => vm.valor);

        const dadosDoGrafico = {
            labels: labels,
            datasets: [{
                label: "Valor Mensal",
                backgroundColor: "#42a5f5",
                data: valores
            }]
        }

        setChartData(dadosDoGrafico);
    }

    useEffect(carregaDadosGrafico, [vendasPorMes]);

    const produtosCardStyle = {
        background: "red", 
        color: "white"
    }

    const clientesCardStyle = {
        background: "blue", 
        color: "white"
    }

    const vendasCardStyle = {
        background: "green", 
        color: "white"
    }
    

    return (
        <div className="p-fluid">
            <div className="field grid">
                <div className="col">
                    <Card title="Produtos" style={produtosCardStyle}>
                        <p className="p-m-0">
                            {produtos}
                        </p>
                    </Card>
                </div>
                <div className="col">
                    <Card title="Clientes" style={clientesCardStyle}>
                        <p className="p-m-0">
                            {clientes}
                        </p>
                    </Card>
                </div>
                <div className="col">
                    <Card title="Vendas" style={vendasCardStyle}>
                        <p className="p-m-0">
                            {vendas}
                        </p>
                    </Card>
                </div>

            </div>

            <div className="field grid">
                <div className="col">
                    <Chart type="bar" data={chartData} style={{position: 'relative', width: '100%'}} />
                </div>
            </div>

        </div>

    )
}