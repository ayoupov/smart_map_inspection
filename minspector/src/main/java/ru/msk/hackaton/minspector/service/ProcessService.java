package ru.msk.hackaton.minspector.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.msk.hackaton.minspector.dao.entities.TaskEntity;
import ru.msk.hackaton.minspector.dao.repositories.MobileInspectorDirectRepository;
import ru.msk.hackaton.minspector.dao.repositories.TaskRepository;
import ru.msk.hackaton.minspector.dao.repositories.UserRepository;

import java.util.Random;

@AllArgsConstructor
@Service
@Slf4j
public class ProcessService {

    private TaskRepository repository;
    private UserRepository userRepository;
    private MobileInspectorDirectRepository directRepository;
    private ObjectMapper objectMapper;

    @Transactional
    public JsonNode saveTask(JsonNode json) {
        ArrayNode array = (ArrayNode) json;
        ArrayNode result = objectMapper.createArrayNode();
        for (JsonNode jsonTask : array) {
            if (!jsonTask.has("properties")) {
                log.info("There are invalid task entity");
            }

            JsonNode properties = jsonTask.get("properties");
            int id = properties.get("id").intValue();
            TaskEntity entity = repository.findById(id).orElse(null);
            if (entity == null) {
                entity = new TaskEntity();
                entity.setId(id);
            }
            entity.setTask(processWorkMock(jsonTask));

            final TaskEntity ent = entity;
            userRepository.findByName(jsonTask.get("inspector").textValue()).ifPresent(user -> {
                ent.setInspectorId(user.getId());
            });

            directRepository.saveTask(entity);
            result.add(entity.getTask());
        }

        return result;
    }

    public ObjectNode processWorkMock(JsonNode source) {
        ObjectNode editable = source.deepCopy();
        ObjectNode assesmentList = objectMapper.createObjectNode();
        assesmentList.put("carriageway", (int) (Math.random() * 10) * 10);
        assesmentList.put("border_stone", (int) (Math.random() * 10) * 10);
        assesmentList.put("lamp_posts", (int) (Math.random() * 10) * 10);
        assesmentList.put("man_hole", (int) (Math.random() * 10) * 10);

        editable.putPOJO("assesmentList", assesmentList);

        return editable;
    }
}
