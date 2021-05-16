create table if not EXISTS user 
(
    id int PRIMARY KEY AUTO_INCREMENT,
    email varchar(100) not null,
    password varchar(20) not null,
    isViewer int not null
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;