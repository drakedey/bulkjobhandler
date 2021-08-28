--liquibase formatted sql
--changeset joskar.hernandez:admin_0.0.1 context:dev,base
--comment script for based database
CREATE TABLE job_type(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100),
    created_date timestamp without time zone default now()
);

CREATE TABLE job(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100),
    created_date timestamp without time zone default now(),
    updated_date timestamp without time zone default now(),
    scheduled_date timestamp without time zone not null,
    created_by TEXT NOT NULL,
    job_type_id BIGINT not null,
    script text not null,
    CONSTRAINT fk_job_type FOREIGN KEY (job_type_id) REFERENCES job_type (id)
);

CREATE TABLE job_binacle(
    id BIGSERIAL PRIMARY KEY,
    binacle_text text not null,
    created_date timestamp without time zone default now(),
    job_id BIGINT not null,
    CONSTRAINT fk_job FOREIGN KEY (job_id) REFERENCES job(id)
);

--changeset joskar.hernandez:admin_0.0.2 context:dev
--comment script insert base VALUES

INSERT INTO job_type (title) VALUES ('IN LINE');

--changeset joskar.hernandez:admin_0.0.3 context:dev
--comment added column state to job
ALTER TABLE job ADD COLUMN state VARCHAR(40) DEFAULT 'SCHEDULED';
UPDATE job SET state = 'SCHEDULED';
ALTER TABLE job ALTER COLUMN state SET NOT NULL;