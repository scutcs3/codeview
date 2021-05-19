create table if not EXISTS interview 
(
    id int PRIMARY KEY AUTO_INCREMENT,
    viewer_id int not null,
    viewee_id int not null,
    start_time datetime not null,
    finish_time DATETIME not null,
    status ENUM('created', 'ready', 'cancelled', 'rejected') not null,
    FOREIGN KEY (viewer_id) REFERENCES user(id),
    FOREIGN KEY (viewee_id) REFERENCES user(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;