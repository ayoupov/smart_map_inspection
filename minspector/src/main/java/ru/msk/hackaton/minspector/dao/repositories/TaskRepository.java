package ru.msk.hackaton.minspector.dao.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.msk.hackaton.minspector.dao.entities.TaskEntity;

public interface TaskRepository extends JpaRepository<TaskEntity, Integer> {

    Page<TaskEntity> findAllByInspectorId(int inspectorId, Pageable pageable);

}
