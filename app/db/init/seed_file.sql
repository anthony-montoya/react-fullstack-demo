DROP TABLE IF EXISTS superheroes;

CREATE TABLE IF NOT EXISTS superheroes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    power TEXT
);

INSERT INTO superheroes
(name, power)
VALUES
('Superman', 'Flying'),
('Aquaman', 'Talks to fish'),
('Wonder Woman', 'Immortal'),
('Batman', 'Rich');