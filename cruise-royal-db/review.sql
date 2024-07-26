create table review
(
    id          int auto_increment
        primary key,
    comment     varchar(255) null,
    rating      int          not null,
    review_date datetime     null,
    booking_id  int          null,
    user_id     int          null
)
    engine = MyISAM;

create index FKiyf57dy48lyiftdrf7y87rnxi
    on review (user_id);

create index FKk4xawqohtguy5yx5nnpba6yf3
    on review (booking_id);

