create table if not EXISTS comment 
(
    id int PRIMARY KEY AUTO_INCREMENT,
    content text,
    interview_id int not null,
    owner_id int not null,
    created_at datetime not null,
    FOREIGN KEY (interview_id) REFERENCES interview(id),
    FOREIGN KEY (owner_id) REFERENCES user(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;