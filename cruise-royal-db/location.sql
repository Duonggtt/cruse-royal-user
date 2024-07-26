create table location
(
    id         int auto_increment
        primary key,
    address    varchar(255) null,
    city       varchar(255) null,
    route_name varchar(255) null
)
    engine = MyISAM;

