package io.github.brayansistemas26.vendasapiback.model.repository;

import io.github.brayansistemas26.vendasapiback.model.Venda;
import io.github.brayansistemas26.vendasapiback.model.projections.VendaPorMes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    @Query(value = "select extract(month from v.data_venda) as mes, sum(v.total) as valor from " +
            "venda v where extract(year from v.data_venda) = :ano " +
            "group by extract(month from v.data_venda)" +
            "order by extract(month from v.data_venda)", nativeQuery = true)
    List<VendaPorMes> obterSomatoriaVendasPorMes(@Param("ano") Integer ano);
}
