create table user_image
(
    id         int auto_increment
        primary key,
    created_at timestamp    null,
    data       longblob     null,
    type       varchar(255) null,
    user_id    int          null
)
    engine = MyISAM;

create index FK5m3lhx7tcj9h9ju10xo4ruqcn
    on user_image (user_id);

