package io.github.brayansistemas26.vendasapiback.rest.dashboard;

import lombok.*;


public class DashBoardData {

    private Long produtos;
    private Long clientes;
    private Long vendas;

    public Long getProdutos() {
        return produtos;
    }

    public void setProdutos(Long produtos) {
        this.produtos = produtos;
    }

    public Long getClientes() {
        return clientes;
    }

    public void setClientes(Long clientes) {
        this.clientes = clientes;
    }

    public Long getVendas() {
        return vendas;
    }

    public void setVendas(Long vendas) {
        this.vendas = vendas;
    }

    public DashBoardData(Long produtos, Long clientes, Long vendas) {
        this.produtos = produtos;
        this.clientes = clientes;
        this.vendas = vendas;
    }

    @Override
    public String toString() {
        return "DashBoardData{" +
                "produtos=" + produtos +
                ", clientes=" + clientes +
                ", vendas=" + vendas +
                '}';
    }
}
