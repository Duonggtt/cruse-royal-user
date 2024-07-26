create table cabin_type
(
    id          int auto_increment
        primary key,
    description varchar(255)   null,
    max_guests  int            null,
    name        varchar(255)   null,
    price       decimal(19, 2) null,
    room_size   int            null
)
    engine = MyISAM;

