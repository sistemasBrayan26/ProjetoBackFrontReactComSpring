package io.github.brayansistemas26.vendasapiback.rest.produtos;

import io.github.brayansistemas26.vendasapiback.model.Venda;
import io.github.brayansistemas26.vendasapiback.model.repository.ItemVendaRepository;
import io.github.brayansistemas26.vendasapiback.model.repository.VendaRepository;
import io.github.brayansistemas26.vendasapiback.service.RelatorioVendasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/vendas")
public class VendasController {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ItemVendaRepository itemVendaRepository;

    @Autowired
    private RelatorioVendasService relatorioVendasService;

    @PostMapping
    @Transactional
    public void realizarVenda(@RequestBody Venda venda) {
        vendaRepository.save(venda);
        venda.getItens().stream().forEach(item -> item.setVenda(venda));
        itemVendaRepository.saveAll(venda.getItens());

    }

    @GetMapping
    public ResponseEntity<byte[]> relatorioVendas() {
        byte[] relatorioGerado =  relatorioVendasService.gerarRelatorio();
        return ResponseEntity.ok(null);
    }
}
