create schema if not exists contact_list;

create table if not exists contact_list.users
(
    user_uuid uuid default gen_random_uuid() not null
    constraint user_pk
    primary key,
    email text not null unique ,
    password_hashed text not null,
    created_at timestamp default now()
);
