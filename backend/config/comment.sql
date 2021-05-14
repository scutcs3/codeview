create table if not EXISTS comment 
(
    id int PRIMARY KEY AUTO_INCREMENT,
    content text,
    interview_id int not null,
    user_id int not null,
    created_at datatime not null
    FOREIGN KEY (interview_id) REFERENCES interview(id)
    FOREIGN KEY (user_id) REFERENCES user(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;