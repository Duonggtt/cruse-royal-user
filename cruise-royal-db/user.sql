create table user
(
    id       int auto_increment
        primary key,
    address  varchar(255) null,
    email    varchar(255) null,
    name     varchar(255) null,
    password varchar(255) null,
    phone    varchar(255) null,
    username varchar(255) null
)
    engine = MyISAM;

