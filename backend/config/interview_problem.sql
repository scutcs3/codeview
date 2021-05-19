create table if not EXISTS interview_problem
(
    id int PRIMARY KEY AUTO_INCREMENT,
    interview_id int not null,
    problem_id int not null,
    FOREIGN KEY (interview_id) REFERENCES interview(id),
    FOREIGN KEY (problem_id) REFERENCES problem(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;