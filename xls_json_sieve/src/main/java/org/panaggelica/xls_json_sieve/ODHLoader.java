package org.panaggelica.xls_json_sieve;

import lombok.Data;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.panaggelica.xls_json_sieve.model.ODHModel;
import org.panaggelica.xls_json_sieve.model.ODHObjectDescriptor;
import org.panaggelica.xls_json_sieve.util.IOUtil;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Component
@Data
@Slf4j
public class ODHLoader {

    static ODHModel model;

    public static ODHModel getModel() {
        return model;
    }

    @SneakyThrows
    @PostConstruct
    public static void loadODH() {
        final InputStream odh = Thread.currentThread().getContextClassLoader().getResourceAsStream("odh20200928");

        List<ODHObjectDescriptor> objects = new ArrayList<>();
        BufferedReader br = new BufferedReader(new InputStreamReader(odh));
        String line;
        while ((line = br.readLine()) != null) {
            try {
                ODHObjectDescriptor descriptor = IOUtil.objectMapper.readValue(line, ODHObjectDescriptor.class);
                objects.add(descriptor);
            } catch (Exception e) {
                log.error("bad line: {}\n", line, e);
            }
        }

        model = new ODHModel();
        model.setObjects(objects);
        model.list();
    }
}
