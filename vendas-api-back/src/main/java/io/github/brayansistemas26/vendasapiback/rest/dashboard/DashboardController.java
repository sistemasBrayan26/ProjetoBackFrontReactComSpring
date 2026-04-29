package io.github.brayansistemas26.vendasapiback.rest.dashboard;

import io.github.brayansistemas26.vendasapiback.model.projections.VendaPorMes;
import io.github.brayansistemas26.vendasapiback.model.repository.ClienteRepository;
import io.github.brayansistemas26.vendasapiback.model.repository.ProdutoRepository;
import io.github.brayansistemas26.vendasapiback.model.repository.VendaRepository;
import lombok.AllArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@AllArgsConstructor
public class DashboardController {

    private VendaRepository vendaRepository;

    private ClienteRepository clienteRepository;

    private ProdutoRepository produtoRepository;

    @GetMapping(produces = "application/json")
    public DashBoardData getDashBoard() {

        long vendasCount = vendaRepository.count();
        long clienteCount = clienteRepository.count();
        long produtosCount = produtoRepository.count();
        List<VendaPorMes> vendasMes = vendaRepository.obterSomatoriaVendasPorMes(LocalDate.now().getYear());

        return new DashBoardData(produtosCount, clienteCount, vendasCount, vendasMes);

    }

}
