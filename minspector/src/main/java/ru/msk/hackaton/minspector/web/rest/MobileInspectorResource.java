package ru.msk.hackaton.minspector.web.rest;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.msk.hackaton.minspector.service.MobileInspectorService;
import ru.msk.hackaton.minspector.service.ProcessService;
import ru.msk.hackaton.minspector.web.rest.dto.requests.MobileInspectorTasksRequest;

@RestController
@RequestMapping(value = "/mi/api/v1")
@AllArgsConstructor
public class MobileInspectorResource {

    private MobileInspectorService service;
    private ProcessService processService;

    @GetMapping(path = "/tasks")
    public JsonNode getMiTasks(
            @RequestParam(value = "inspectorId", required = false) Integer inspectorId,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "25") int limit,
            @RequestParam(name = "orderDir", required = false, defaultValue = "desc") String orderDir,
            @RequestParam(name = "orderBy", defaultValue = "controlDate", required = false) String orderBy) {

        MobileInspectorTasksRequest request = new MobileInspectorTasksRequest(limit, page, orderBy, "asc".equals(orderDir), inspectorId);
        return service.getMiTasks(request);
    }

    @PostMapping(path = "/savetask")
    public JsonNode saveTask(@RequestBody JsonNode json) {
        return processService.saveTask(json);
    }
}
