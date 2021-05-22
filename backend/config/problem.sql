create table if not EXISTS problem 
(
    id int PRIMARY KEY AUTO_INCREMENT,
    title varchar(100) not null,
    content text not null,
    owner_id int not null,
    created_at datetime not null,
    updated_at datetime not null,
    FOREIGN KEY (owner_id) REFERENCES user(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;