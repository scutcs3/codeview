-- user
create table if not EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email varchar(100) not null unique,
    password varchar(20) not null
);
-- problem
create table if not EXISTS problem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title varchar(100) not null,
    content text not null,
    owner_id int not null,
    created_at datetime not null,
    updated_at datetime not null,
    FOREIGN KEY (owner_id) REFERENCES user(id)
);
-- interview
create table if not EXISTS interview (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    viewer_id int not null,
    viewee_id int,
    start_time datetime,
    finish_time datetime,
    status text not null,
    FOREIGN KEY (viewer_id) REFERENCES user(id),
    FOREIGN KEY (viewee_id) REFERENCES user(id)
);
-- interview_problem
create table if not EXISTS interview_problem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    interview_id int not null,
    problem_id int not null,
    FOREIGN KEY (interview_id) REFERENCES interview(id),
    FOREIGN KEY (problem_id) REFERENCES problem(id)
);
-- comment
create table if not EXISTS comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content text,
    interview_id int not null,
    owner_id int not null,
    created_at datetime not null,
    FOREIGN KEY (interview_id) REFERENCES interview(id),
    FOREIGN KEY (owner_id) REFERENCES user(id)
);
-- answer
create table if not EXISTS answer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    interview_id int not null,
    problem_id int not null,
    language text not null,
    content text not null,
    created_at datetime not null,
    FOREIGN KEY (interview_id) REFERENCES interview(id),
    FOREIGN KEY (problem_id) REFERENCES problem(id)
);