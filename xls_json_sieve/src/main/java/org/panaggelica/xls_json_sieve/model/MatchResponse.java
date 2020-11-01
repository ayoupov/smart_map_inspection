package org.panaggelica.xls_json_sieve.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchResponse {
    String xlsName;
    String odhName;
    long objectId;
    String matchReason;
}
