package io.github.brayansistemas26.vendasapiback.rest.clientes;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ClienteFormRequest {

    private Long id;
    private String nome;
    @JsonFormat(pattern =  "dd/MM/yyyy")
    private LocalDate nascimento;
    private String cpf;
    private String endereco;
    private String email;
    private String telefone;
    @JsonFormat(pattern =  "dd/MM/yyyy")
    private LocalDate dataCadastro;
}
