package org.panaggelica.xls_json_sieve;

import org.n52.jackson.datatype.jts.JtsModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SieveApplicationConfiguration {

    @Bean
    public JtsModule getJtsModule() {
        return new JtsModule();
    }
}
