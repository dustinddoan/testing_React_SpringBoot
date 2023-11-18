create table user (
    id uuid not null primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null
)