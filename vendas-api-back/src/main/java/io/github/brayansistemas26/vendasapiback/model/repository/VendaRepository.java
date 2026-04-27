package io.github.brayansistemas26.vendasapiback.model.repository;

import io.github.brayansistemas26.vendasapiback.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {
}
