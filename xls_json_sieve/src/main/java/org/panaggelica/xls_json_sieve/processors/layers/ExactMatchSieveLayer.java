package org.panaggelica.xls_json_sieve.processors.layers;

import org.panaggelica.xls_json_sieve.model.ODHObjectDescriptor;
import org.panaggelica.xls_json_sieve.model.XLSObjectDescriptor;

public class ExactMatchSieveLayer extends AbstractSieveLayer {

    public boolean toss(ODHObjectDescriptor o, XLSObjectDescriptor x) {
        return clean(o.getName()).equals(clean(x.getObjectName()));
    }

    @Override
    public String reason() {
        return "full match";
    }
}
