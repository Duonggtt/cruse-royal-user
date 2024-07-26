create table cruise_tags
(
    cruise_id int not null,
    tags_id   int not null
)
    engine = MyISAM;

create index FK6x11s72esqvrro7roa6bevp99
    on cruise_tags (cruise_id);

create index FKghhl1w1rrm1orfj9w158bvvj2
    on cruise_tags (tags_id);

