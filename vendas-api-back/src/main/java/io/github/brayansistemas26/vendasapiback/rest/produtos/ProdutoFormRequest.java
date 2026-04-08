package io.github.brayansistemas26.vendasapiback.rest.produtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProdutoFormRequest {

    private String sku;

    private String descricao;

    private BigDecimal preco;

    private String nome;
}
