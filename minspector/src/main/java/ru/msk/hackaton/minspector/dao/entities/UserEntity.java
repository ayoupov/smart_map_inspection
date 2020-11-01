package ru.msk.hackaton.minspector.dao.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    private int id;
    private String name;

    private String description;
}
