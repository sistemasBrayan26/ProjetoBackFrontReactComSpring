package io.github.brayansistemas26.vendasapiback.rest.produtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ClienteFormRequest {

    private Long id;
    private String nome;
    private LocalDate nascimento;
    private String cpf;
    private String endereco;
    private String email;
    private String telefone;
    private LocalDate dataCadastro;
}
