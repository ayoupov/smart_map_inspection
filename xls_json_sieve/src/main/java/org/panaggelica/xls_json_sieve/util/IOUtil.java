package org.panaggelica.xls_json_sieve.util;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.n52.jackson.datatype.jts.JtsModule;

public class IOUtil {

    public static ObjectMapper objectMapper = new ObjectMapper();

    static {
        objectMapper.registerModule(new JtsModule());
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }
}
