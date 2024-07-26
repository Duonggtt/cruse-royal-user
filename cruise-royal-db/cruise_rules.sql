create table cruise_rules
(
    cruise_id int not null,
    rules_id  int not null
)
    engine = MyISAM;

create index FK3aek53vu9wlel9j9lsvs2egu9
    on cruise_rules (rules_id);

create index FKfw12vyeat2l47ikb7gdsojh51
    on cruise_rules (cruise_id);

