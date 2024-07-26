create table cabin
(
    id              int auto_increment
        primary key,
    cabin_type_id   int null,
    cruise_id       int null,
    room_quantity   int null,
    available_rooms int null
)
    engine = MyISAM;

create index FK84h1370cg1gofxnwy9mmeh7gb
    on cabin (cruise_id);

create index FKq8g0kc9kbr7wifmhhi9es0kdh
    on cabin (cabin_type_id);

