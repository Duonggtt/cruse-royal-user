create table cruise_detail_section
(
    id        int auto_increment
        primary key,
    text      text null,
    cruise_id int  null
)
    engine = MyISAM;

create index FK74mtpdybhgbojlo69bcp4xjiy
    on cruise_detail_section (cruise_id);

