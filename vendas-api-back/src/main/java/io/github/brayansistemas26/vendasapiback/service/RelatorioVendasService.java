package io.github.brayansistemas26.vendasapiback.service;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.pdf.JRPdfExporter;
import net.sf.jasperreports.pdf.SimplePdfExporterConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class RelatorioVendasService {

    @Value("classpath:reports/relatorio-vendas.jrxml")
    private Resource relatorioVendas;

    @Autowired
    private DataSource dataSource;

    public byte[] gerarRelatorio(Long idCliente, Date inicio, Date fim) {
        try (Connection conexao = dataSource.getConnection()) {
            // 1. Compila o relatório (JRXML para JasperReport)
            JasperReport compiledReport = JasperCompileManager.compileReport(relatorioVendas.getInputStream());

            // 2. Preenche o relatório com a conexão do banco
            Map<String, Object> parametros = new HashMap<>();
            parametros.put("ID_CLIENTE", idCliente);
            parametros.put("DATA_INICIO", inicio);
            parametros.put("DATA_FIM", fim);

            JasperPrint jasperPrint = JasperFillManager.fillReport(compiledReport, parametros, conexao);

            // 3. Exportação Manual para PDF (Contorna o erro "Missing PDF Extension")
            JRPdfExporter exporter = new JRPdfExporter();
            exporter.setExporterInput(new SimpleExporterInput(jasperPrint));

            ByteArrayOutputStream pdfStream = new ByteArrayOutputStream();
            exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(pdfStream));

            SimplePdfExporterConfiguration configuration = new SimplePdfExporterConfiguration();
            exporter.setConfiguration(configuration);

            // 4. Executa a exportação
            exporter.exportReport();

            return pdfStream.toByteArray();

        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro SQL ao conectar para o relatório: " + e.getMessage());
        } catch (JRException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro no motor do JasperReports: " + e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao ler o arquivo de relatório: " + e.getMessage());
        }
    }
}
