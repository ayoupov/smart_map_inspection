package org.panaggelica.xls_json_sieve.model;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Slf4j
public class XLSModel {
    List<XLSObjectDescriptor> objects;

    public void filter() {
        objects = objects.stream()
                .filter(d ->
                        !d.objectName.toLowerCase().contains("итого") &&
                        !"".equals(d.objectName.trim()))
                .collect(Collectors.toList());
    }

    public void list() {
        log.info("xls has {} valid entries", objects.size());
        log.info("sample: {}", objects.subList(0, 5));
    }
}
