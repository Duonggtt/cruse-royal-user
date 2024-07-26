create table cruise_image
(
    id         int auto_increment
        primary key,
    created_at timestamp    null,
    data       longblob     null,
    type       varchar(255) null,
    crusie_id  int          null
)
    engine = MyISAM;

create index FKh3wx6jyy3h5mr4eyhkcnahoke
    on cruise_image (crusie_id);

