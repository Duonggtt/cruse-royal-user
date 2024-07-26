create table user_roles
(
    user_id  int not null,
    roles_id int not null
)
    engine = MyISAM;

create index FK55itppkw3i07do3h7qoclqd4k
    on user_roles (user_id);

create index FKj9553ass9uctjrmh0gkqsmv0d
    on user_roles (roles_id);

