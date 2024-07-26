create table cruise_short_descs
(
    cruise_id  int          not null,
    short_desc varchar(255) null
)
    engine = MyISAM;

create index FKhhqsvlyr1i290lr5w41b4ul3e
    on cruise_short_descs (cruise_id);

