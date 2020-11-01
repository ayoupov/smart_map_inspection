package ru.msk.hackaton.minspector.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.msk.hackaton.minspector.dao.entities.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Optional<UserEntity> findByName(String name);

}
