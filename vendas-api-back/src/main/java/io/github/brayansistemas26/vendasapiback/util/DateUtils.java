package io.github.brayansistemas26.vendasapiback.util;

import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateUtils {

    public static final Date DATA_INICIO_PADRAO;
    public static final String PADRAO_FORMATACAO_DATA = "dd/MM/yyyy";

    static {
        DATA_INICIO_PADRAO = DateUtils.converterData("01/01/1970");
    }

    public static Date converterData(String data){
        return converterData(data, false);
    }

    public static Date converterData(String data, boolean atEndOfDay) {
        if (StringUtils.hasText(data)){
            var dataConvertida = LocalDate.parse(data, DateTimeFormatter.ofPattern(PADRAO_FORMATACAO_DATA));
            LocalDateTime dataHora;

            if (atEndOfDay){
                dataHora = dataConvertida.atTime(LocalTime.of(23, 59));
            } else {
                dataHora = dataConvertida.atStartOfDay();
            }
            var instant = dataHora.atZone(ZoneId.systemDefault()).toInstant();
            return Date.from(instant);
        }

        return null;
    }

    public static Date hoje(boolean fimDoDia) {
        String dataHojeFormatada = LocalDate.now().format(DateTimeFormatter.ofPattern(PADRAO_FORMATACAO_DATA));
        return converterData(dataHojeFormatada, fimDoDia);
    }
}
