package org.panaggelica.xls_json_sieve.processors.layers;

import lombok.extern.slf4j.Slf4j;
import org.panaggelica.xls_json_sieve.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public abstract class AbstractSieveLayer implements SieveLayer {


    protected static String clean(String s) {
        return s.toLowerCase().replaceAll("ул\\.", "")
                .replaceAll("улица","")
                .replaceAll("[\\s,\\.»«\"']", "");
    }

    private final List<ODHObjectDescriptor> oMatched = new ArrayList<>();
    private final List<XLSObjectDescriptor> xMatched = new ArrayList<>();

    @Override
    public List<MatchResponse> sieve(ODHModel odh, XLSModel xls) {
        List<MatchResponse> responses = new ArrayList<>();

        List<ODHObjectDescriptor> os = new ArrayList<>(odh.getObjects());
        List<XLSObjectDescriptor> xs = new ArrayList<>(xls.getObjects());
        log.info("unmatched {} from {}", xs.size(), os.size());

        for (XLSObjectDescriptor x : xs) {
            final List<ODHObjectDescriptor> collected =
                    os.stream().filter(o -> toss(o, x)).collect(Collectors.toList());
            if (collected.size() == 1) {
                final ODHObjectDescriptor o = collected.get(0);
                oMatched.add(o);
                xMatched.add(x);
                responses.add(new MatchResponse(x.getObjectName(), o.getName(), o.getObject_id(), reason()));
            }
        }

        log.info("matched {} entries, {}", xMatched.size(), reason());

        os.removeAll(oMatched);
        odh.setObjects(os);
        xs.removeAll(xMatched);
        xls.setObjects(xs);

        return responses;
    }

}
