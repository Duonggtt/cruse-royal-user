create table booking
(
    id             int auto_increment
        primary key,
    guest_quantity int            null,
    booking_date   datetime       null,
    booking_status bit            null,
    note           varchar(255)   null,
    order_date     datetime       null,
    payment_status bit            null,
    total_price    decimal(19, 2) null,
    cabin_id       int            null,
    cruise_id      int            null,
    user_id        int            null
)
    engine = MyISAM;

create index FKhvwdlp5x3s1g86ilsts2x9qxo
    on booking (cruise_id);

create index FKkgseyy7t56x7lkjgu3wah5s3t
    on booking (user_id);

create index FKorrlj9g9un320432h51rdvjyp
    on booking (cabin_id);

