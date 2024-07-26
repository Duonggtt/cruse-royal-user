create table cruise
(
    id             int auto_increment
        primary key,
    arrival_time   time           null,
    cabin_quantity int            null,
    departure_time time           null,
    description    varchar(255)   null,
    lauched_year   int            null,
    material       varchar(255)   null,
    name           varchar(255)   null,
    owned_date     datetime       null,
    price          decimal(19, 2) null,
    location_id    int            null,
    owner_id       int            null
)
    engine = MyISAM;

create index FKcxin78ehdtxt305wmw7w7pdpj
    on cruise (owner_id);

create index FKg0xaqs366c252fbvwyd4qwnfb
    on cruise (location_id);

