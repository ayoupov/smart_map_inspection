package ru.msk.hackaton.minspector.dao.repositories;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;
import ru.msk.hackaton.minspector.dao.entities.TaskEntity;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Repository
@AllArgsConstructor
public class MobileInspectorDirectRepository {

    private TaskRepository repository;
    private NamedParameterJdbcTemplate jdbc;

    public void saveTask(TaskEntity entity) {
        Map<String, Object> params = new HashMap<>();
        params.put("id", entity.getId());
        params.put("inspector_id", entity.getInspectorId());
        params.put("task", entity.getTask().toString());
        if(/*repository.existsById(entity.getId())*/existById(entity.getId())) {
            jdbc.update("update mi_task set inspector_id = :inspector_id, task = :task::jsonb where id = :id", params);
        } else {
            jdbc.update("insert into mi_task(id, inspector_id, task) values (:id, :inspector_id, :task::jsonb)", params);
        }
    }

    public boolean existById(int id) {
        SqlParameterSource params = new MapSqlParameterSource("id", id);
        return jdbc.queryForObject("select exists(select id from mi_task where id = :id) ex",
                params,
                (rs, i) -> "t".equals(rs.getString("ex")));
    }
}
