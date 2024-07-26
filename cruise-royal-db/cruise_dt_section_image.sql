create table cruise_dt_section_image
(
    id                       int auto_increment
        primary key,
    created_at               timestamp    null,
    data                     longblob     null,
    type                     varchar(255) null,
    cruise_detail_section_id int          null
)
    engine = MyISAM;

create index FKe2crtr7ooa7jn0dgdejjsnobq
    on cruise_dt_section_image (cruise_detail_section_id);

