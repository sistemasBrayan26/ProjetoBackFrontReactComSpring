package io.github.brayansistemas26.vendasapiback.model.repository;

import io.github.brayansistemas26.vendasapiback.model.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Query("select c from Cliente c where upper(c.nome) like upper(:nome) and c.cpf like :cpf")
    Page<Cliente> buscarPorNomeCpf(String nome, String cpf, Pageable pageable);
}
