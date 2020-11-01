package org.panaggelica.xls_json_sieve.processors.layers;

import org.panaggelica.xls_json_sieve.model.ODHObjectDescriptor;
import org.panaggelica.xls_json_sieve.model.XLSObjectDescriptor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SwapMatchSieveLayer extends AbstractSieveLayer {

    private String cleanNoSpaces(String s) {
        return s.toLowerCase()
                .replaceAll("ул\\.", "")
                .replaceAll("улица", "")
                .replaceAll("[,\\.»«\"']", " ");
    }

    @Override
    public boolean toss(ODHObjectDescriptor o, XLSObjectDescriptor x) {
        Set<String> oSet = new HashSet<>(List.of(
                cleanNoSpaces(o.getName()).split("\\s+"))
        );
        Set<String> xSet = new HashSet<>(List.of(
                cleanNoSpaces(x.getObjectName()).toLowerCase().split("\\s+"))
        );
        oSet.removeAll(xSet);
        return oSet.isEmpty();
    }

    @Override
    public String reason() {
        return "swapped words";
    }
}
