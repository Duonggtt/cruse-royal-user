create table cabin_type_image
(
    id                  int auto_increment
        primary key,
    created_at          timestamp    null,
    data                longblob     null,
    type                varchar(255) null,
    cabin_type_image_id int          null,
    cabin_type_id       int          null
)
    engine = MyISAM;

create index FKdoqa439q2xyjueepwwvfgla12
    on cabin_type_image (cabin_type_id);

create index FKk2ntl0qvob8c5vd1bpqvc9sg
    on cabin_type_image (cabin_type_image_id);

