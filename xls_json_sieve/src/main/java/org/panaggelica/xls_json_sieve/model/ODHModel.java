package org.panaggelica.xls_json_sieve.model;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Data
@Slf4j
public class ODHModel{

    List<ODHObjectDescriptor> objects;

    public void list() {
        log.info("odh has {} valid entries", objects.size());
        log.info("sample: {}", objects.subList(0, 5));
    }

}
