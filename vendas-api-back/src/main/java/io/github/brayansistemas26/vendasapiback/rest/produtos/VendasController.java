package io.github.brayansistemas26.vendasapiback.rest.produtos;

import io.github.brayansistemas26.vendasapiback.model.Venda;
import io.github.brayansistemas26.vendasapiback.model.repository.ItemVendaRepository;
import io.github.brayansistemas26.vendasapiback.model.repository.VendaRepository;
import io.github.brayansistemas26.vendasapiback.service.RelatorioVendasService;
import io.github.brayansistemas26.vendasapiback.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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

    @GetMapping("/relatorio-vendas")
    public ResponseEntity<byte[]> relatorioVendas(@RequestParam(value = "id", required = false, defaultValue = "") Long id,
           @RequestParam(value = "inicio", required = false, defaultValue = "") String inicio,
           @RequestParam(value = "fim", required = false, defaultValue = "") String fim) {

        Date dataInicio = DateUtils.converterData(inicio);
        Date dataFim = DateUtils.converterData(fim, true);

        if (dataInicio == null){
            dataInicio = DateUtils.DATA_INICIO_PADRAO;
        }

        if (dataFim == null){
            dataFim = DateUtils.hoje(true);
        }

        byte[] relatorioGerado = relatorioVendasService.gerarRelatorio(id, dataInicio, dataFim);

        if (relatorioGerado == null) {
            return ResponseEntity.noContent().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF); // Define como PDF
        var filename = "relatorio-vendas.pdf";

        // "inline" abre no navegador, "attachment" faz download direto
        headers.setContentDisposition(ContentDisposition.inline().filename(filename).build());

        return new ResponseEntity<>(relatorioGerado, headers, HttpStatus.OK);
    }


}
