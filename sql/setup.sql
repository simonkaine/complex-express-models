DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS animals;

CREATE TABLE species (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    extinct BOOLEAN,
    type TEXT NOT NULL
);

CREATE TABLE animals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    nickname TEXT NOT NULL,
    type_id BIGINT NOT NULL,
    FOREIGN KEY(type_id) REFERENCES species(id)
);

