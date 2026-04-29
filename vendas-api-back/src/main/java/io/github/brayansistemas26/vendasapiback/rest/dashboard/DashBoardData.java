package io.github.brayansistemas26.vendasapiback.rest.dashboard;

import io.github.brayansistemas26.vendasapiback.model.projections.VendaPorMes;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class DashBoardData {

    private Long produtos;
    private Long clientes;
    private Long vendas;
    private List<VendaPorMes> vendasMes;


    public DashBoardData(Long produtos, Long clientes, Long vendas, List<VendaPorMes> vendasMes) {
        this.produtos = produtos;
        this.clientes = clientes;
        this.vendas = vendas;
        this.vendasMes = vendasMes;
        preencherMesesFaltantes();
    }

    public void preencherMesesFaltantes() {
        if (!this.vendasMes.isEmpty()){
            int mesMaximo = getVendasMes().stream().mapToInt(VendaPorMes::getMes).max().getAsInt();

            List<Integer> listaMes = IntStream.range(1, mesMaximo).boxed().collect(Collectors.toList());

            List<Integer> mesesAdicionados = getVendasMes().stream().map(VendaPorMes::getMes).collect(Collectors.toList());
            listaMes.stream().forEach(mes -> {
                if (!mesesAdicionados.contains(mes)){
                    VendaPorMes vendaPorMes = new VendaPorMes() {
                        @Override
                        public Integer getMes() {
                            return mes;
                        }

                        @Override
                        public BigDecimal getValor() {
                            return BigDecimal.ZERO;
                        }
                    };
                    getVendasMes().add(vendaPorMes);
                }
            });

            getVendasMes().sort(Comparator.comparing(VendaPorMes::getMes));
        }
    }


}
