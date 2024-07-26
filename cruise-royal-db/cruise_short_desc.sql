create table cruise_short_desc
(
    cruise_id  int          not null,
    short_desc varchar(255) null
)
    engine = MyISAM;

create index FKatikia2xjlpyhb4ewutgn3dyp
    on cruise_short_desc (cruise_id);

