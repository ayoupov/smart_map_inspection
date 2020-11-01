create table mobinspector.users
(
    id integer not null
        constraint users_pk
            primary key,
    name text not null,
    description text
);

alter table mobinspector.users owner to postgres;

INSERT INTO mobinspector.users (id, name, description) VALUES (1, 'Инспектор 3', 'Инспектор 3');

create table mobinspector.mi_task
(
    id bigint not null
        constraint mi_task_pk
            primary key,
    inspector_id integer,
    task jsonb
);

alter table mobinspector.mi_task owner to postgres;


