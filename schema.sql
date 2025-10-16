CREATE TABLE event_type (
    event_type_id SERIAL PRIMARY KEY,
    name_event_type VARCHAR(100) NOT NULL
);

CREATE TABLE event_manager (
    event_manager_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(200),             
    phone_manager VARCHAR(30),          
    role_manager VARCHAR(30),           
    email_verified BOOLEAN DEFAULT FALSE 
);

CREATE TABLE event (
    event_id SERIAL PRIMARY KEY,
    name_event VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    start_date DATE,
    end_date DATE,
    start_time TIME,
    end_time TIME,
    description TEXT,
    event_type_id INTEGER NOT NULL, 
    event_manager_id INTEGER NOT NULL,
    FOREIGN KEY (event_type_id) REFERENCES event_type(event_type_id),
    FOREIGN KEY (event_manager_id) REFERENCES event_manager(event_manager_id)
);

CREATE TABLE event_lecture (
    event_lecture_id SERIAL PRIMARY KEY,
    name_event_lecture VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    quantity_vacancies INTEGER,
    start_date DATE,
    end_date DATE,
    start_time TIME,
    end_time TIME,
    description TEXT,
    speaker VARCHAR(100),
    event_id INTEGER NOT NULL,
    event_manager_id INTEGER NOT NULL,
    FOREIGN KEY (event_id) REFERENCES event(event_id),
    FOREIGN KEY (event_manager_id) REFERENCES event_manager(event_manager_id)
);

CREATE TABLE event_participant (
    event_participant_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    address VARCHAR(200),
    phone_participant VARCHAR(30),
    role_participant VARCHAR(30),
    email_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE event_lecture_event_participant (
    event_lecture_id INTEGER NOT NULL,
    event_participant_id INTEGER NOT NULL,
    role_participant VARCHAR(50), 
    PRIMARY KEY (event_lecture_id, event_participant_id),
    FOREIGN KEY (event_lecture_id) REFERENCES event_lecture(event_lecture_id),
    FOREIGN KEY (event_participant_id) REFERENCES event_participant(event_participant_id)
);