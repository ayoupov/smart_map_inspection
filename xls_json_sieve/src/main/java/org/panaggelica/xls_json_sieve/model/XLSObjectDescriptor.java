package org.panaggelica.xls_json_sieve.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class XLSObjectDescriptor {
    String objectName;
    String from;
    String to;
    String district;
}
