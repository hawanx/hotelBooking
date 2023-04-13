-- hotelDb

create table userLogin(

id SERIAL primary key,

name varchar(50) not NULL,
email varchar(50) not NULL,
phoneNo BIGINT not NULL check(phoneNo>=1000000000 and phoneNo<9999999999),
address varchar(50) not NULL,
uname varchar(50) not NULL,
pass varchar(50) not NULL


);


create table booking(

booking_id SERIAL PRIMARY KEY ,
arrive DATE,
depart DATE,
adultNo INT,
childrenNo INT,
roomType varchar(20),
dinner varchar(4),
extraNeeds varchar(500)

);




