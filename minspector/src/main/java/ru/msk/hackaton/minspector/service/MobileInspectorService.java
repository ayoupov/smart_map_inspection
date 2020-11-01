package ru.msk.hackaton.minspector.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.msk.hackaton.minspector.dao.entities.TaskEntity;
import ru.msk.hackaton.minspector.dao.entities.UserEntity;
import ru.msk.hackaton.minspector.dao.repositories.TaskRepository;
import ru.msk.hackaton.minspector.dao.repositories.UserRepository;
import ru.msk.hackaton.minspector.web.rest.dto.requests.MobileInspectorTasksRequest;
import ru.msk.hackaton.minspector.web.rest.dto.responses.MobileInspectorTaskResponse;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class MobileInspectorService {

    private TaskRepository repository;
    private UserRepository userRepository;
    private ObjectMapper objectMapper;

    public ArrayNode getMiTasks(MobileInspectorTasksRequest request) {

        ArrayNode result = objectMapper.createArrayNode();
        List<TaskEntity> tasks;

        if(request.getInspectorId() != null) {
            tasks = repository.findAllByInspectorId(request.getInspectorId(), PageRequest.of(request.getPage(), request.getLimit())).getContent();
        } else {
            tasks = repository.findAll(PageRequest.of(request.getPage(), request.getLimit())).getContent();
        }
        List<Integer> ids = tasks.stream()
                .filter(t -> t.getInspectorId() != null)
                .map(TaskEntity::getInspectorId)
                .collect(Collectors.toList());

        Map<Integer, String> userNameMap = userRepository.findAllById(ids).stream()
                .collect(Collectors.toMap(UserEntity::getId, UserEntity::getName));

        tasks.forEach(task -> {
            ObjectNode objectNode = task.getTask().get("properties").deepCopy();
            objectNode.put("inspector", task.getTask().get("inspector").textValue());
            if(task.getTask().has("assesmentList")) {
                objectNode.putPOJO("assesmentList", task.getTask().get("assesmentList"));
            }
            result.add(objectNode);
        });

/*
[{
   “id”: 3,
   “inspector” : “Ivanov”,
   "cell_object": "1-ой Маевки аллея",
   "cell_repair_start": "на всем протяжении",
   "cell_repair_end": "на всем протяжении",
   "district": "ВАО",
   "state": "Улицы, прилегающие к знаковым объектам префектур АО”
}]

 */
        return result;
    }
}