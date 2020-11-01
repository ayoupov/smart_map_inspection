package org.panaggelica.xls_json_sieve.processors.layers;

import org.panaggelica.xls_json_sieve.model.*;

import java.util.List;

public interface SieveLayer {
    // !метод изменяет входные коллекции
    List<MatchResponse> sieve(ODHModel odh, XLSModel xls);

    // нужный для изменения метод
    boolean toss(ODHObjectDescriptor o, XLSObjectDescriptor x);

    // имя правила, по которому сматчили
    String reason();

}
