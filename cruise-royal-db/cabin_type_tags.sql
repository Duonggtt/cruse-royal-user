create table cabin_type_tags
(
    cabin_type_id int not null,
    tags_id       int not null
)
    engine = MyISAM;

create index FKm070w87etce2gy2xortbtrcy0
    on cabin_type_tags (cabin_type_id);

create index FKp74bpd3ddhlgp2atirci39kiq
    on cabin_type_tags (tags_id);

