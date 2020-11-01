package ru.msk.hackaton.minspector.web.rest.dto.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageableRequest {
    private int limit;
    private int page;
    private String field;
    private boolean asc;
}
