create table if not EXISTS interview 
(
    id int PRIMARY KEY AUTO_INCREMENT,
    viewer_id int not null,
    viewee_id int not null,
    start_time datetime not null,
    end_time DATETIME not null,
    FOREIGN KEY (viewer_id) REFERENCES user(id)
    FOREIGN KEY (viewee_id) REFERENCES user(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;