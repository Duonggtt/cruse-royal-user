create table booking_cabin
(
    booking_id int not null,
    cabin_id   int not null
)
    engine = MyISAM;

create index FK1ddgvovr7v9pfewhkjs2adicv
    on booking_cabin (booking_id);

create index FK8enlwtjl1ektilrwrcothi33e
    on booking_cabin (cabin_id);

