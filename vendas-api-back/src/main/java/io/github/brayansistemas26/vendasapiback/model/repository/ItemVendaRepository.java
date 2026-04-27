package io.github.brayansistemas26.vendasapiback.model.repository;

import io.github.brayansistemas26.vendasapiback.model.ItemVenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemVendaRepository extends JpaRepository<ItemVenda, Long> {
}
