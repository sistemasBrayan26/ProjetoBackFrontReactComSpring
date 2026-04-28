package io.github.brayansistemas26.vendasapiback.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.brayansistemas26.vendasapiback.model.enums.FormaPagamento;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Data
public class Venda implements Serializable {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @Enumerated(EnumType.STRING)
    private FormaPagamento formaPagamento;

    @OneToMany(mappedBy = "venda")
    private List<ItemVenda> itens;

    private BigDecimal total;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataVenda;

    @PrePersist
    public void prePersist() {
        setDataVenda(LocalDate.now());
    }
}
