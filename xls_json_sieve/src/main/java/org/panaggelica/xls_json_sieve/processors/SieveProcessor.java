package org.panaggelica.xls_json_sieve.processors;

import org.panaggelica.xls_json_sieve.model.MatchResponse;
import org.panaggelica.xls_json_sieve.model.ODHModel;
import org.panaggelica.xls_json_sieve.model.XLSModel;
import org.panaggelica.xls_json_sieve.processors.layers.ExactMatchSieveLayer;
import org.panaggelica.xls_json_sieve.processors.layers.SieveLayer;
import org.panaggelica.xls_json_sieve.processors.layers.SwapMatchSieveLayer;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SieveProcessor {

    List<SieveLayer> PIPELINE = List.of(
            // 1. полное соответствие
            new ExactMatchSieveLayer(),
            // 2. перестановка слов
            new SwapMatchSieveLayer()
    );

    public List<MatchResponse> process(ODHModel odh, XLSModel xls) {
        List<MatchResponse> response = new ArrayList<>();

        for (SieveLayer sieveLayer : PIPELINE) {
            response.addAll(sieveLayer.sieve(odh, xls));
        }

        return response;
    }
}
