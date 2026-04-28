package io.github.brayansistemas26.vendasapiback.service;

import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Service
public class RelatorioVendasService {

    @Value("classpath:reports/relatorio-vendas.jrxml")
    private Resource relatorioVendas;

    @Autowired
    private DataSource dataSource;

    public byte[] gerarRelatorio() {

        try (Connection conexao = dataSource.getConnection();) {
            JasperReport compiledReport = JasperCompileManager.compileReport(relatorioVendas.getInputStream());
            Map<String, Object> parametros = new HashMap<>();
            JasperPrint jasperPrint = JasperFillManager.fillReport(compiledReport, parametros, conexao);
            return JasperExportManager.exportReportToPdf(jasperPrint);


        }catch (SQLException e){
            e.printStackTrace();
        } catch (JRException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return null;
    }
}
