package io.github.brayansistemas26.vendasapiback.rest.produtos;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ProdutoFormRequest {

    private Long id;

    private String sku;

    private String descricao;

    private BigDecimal preco;

    private String nome;

    private LocalDate dataCadastro;
}
