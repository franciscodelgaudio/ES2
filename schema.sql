CREATE TABLE event_type (
    event_type_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE event (
    event_id SERIAL PRIMARY KEY,
    name_event VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    start_date DATE,
    end_date DATE,
    event_type_id INTEGER NOT NULL,
    event_price NUMERIC(10,2),
    FOREIGN KEY (event_type_id) REFERENCES event_type(event_type_id)
);

CREATE TABLE event_activity (
    event_activity_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    quantity_vacancies INTEGER,
    start_date DATE,
    end_date DATE,
    event_id INTEGER NOT NULL,
    activity_price NUMERIC(10,2),
    FOREIGN KEY (event_id) REFERENCES event(event_id)
);

CREATE TABLE event_participant (
    event_participant_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100),
    password VARCHAR(100),
    address VARCHAR(200),
    phone_participant VARCHAR(30),
    role_participant VARCHAR(30),
    email_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE event_event_participant (
    event_id INTEGER NOT NULL,
    event_participant_id INTEGER NOT NULL,
    PRIMARY KEY (event_id, event_participant_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id),
    FOREIGN KEY (event_participant_id) REFERENCES event_participant(event_participant_id)
);

CREATE TABLE event_activity_event_participant (
    event_activity_id INTEGER NOT NULL,
    event_participant_id INTEGER NOT NULL,
    PRIMARY KEY (event_activity_id, event_participant_id),
    FOREIGN KEY (event_activity_id) REFERENCES event_activity(event_activity_id),
    FOREIGN KEY (event_participant_id) REFERENCES event_participant(event_participant_id)
);
