-- user
create table if not EXISTS user 
(
    id int PRIMARY KEY AUTO_INCREMENT,
    email varchar(100) not null unique,
    password varchar(20) not null
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- problem
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

-- interview
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

-- interview_problem
create table if not EXISTS interview_problem
(
    id int PRIMARY KEY AUTO_INCREMENT,
    interview_id int not null,
    problem_id int not null,
    FOREIGN KEY (interview_id) REFERENCES interview(id),
    FOREIGN KEY (problem_id) REFERENCES problem(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- comment
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

-- answer
create table if not EXISTS answer 
(
    id int PRIMARY KEY AUTO_INCREMENT,
    interview_id int not null,
    problem_id int not null,
    language enum('c','cpp','java','python','javascript') not null,
    content text not null,
    created_at datetime not null,
    FOREIGN KEY (interview_id) REFERENCES interview(id),
    FOREIGN KEY (problem_id) REFERENCES problem(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;