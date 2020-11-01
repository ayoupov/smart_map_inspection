package ru.msk.hackaton.minspector.web.rest.dto.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MobileInspectorTasksRequest extends PageableRequest {

    private Integer inspectorId;

    public MobileInspectorTasksRequest(int limit, int page, String field, boolean asc, Integer inspectorId) {
        super(limit, page, field, asc);
        this.inspectorId = inspectorId;
    }
}
