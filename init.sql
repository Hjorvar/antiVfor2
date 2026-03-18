-- Nýtt efni: Skjal til að búa til töflur (Schema) og setja inn prufugögn (Seed)

-- Búum til 'recipes' töfluna
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    time_minutes INT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hreinsum töfluna ef við erum að keyra aftur (valfrjálst en gott í þróun)
TRUNCATE TABLE recipes RESTART IDENTITY;

-- Setjum inn smá prufugögn (Seed)
INSERT INTO recipes (title, time_minutes) VALUES
('Kanilsnúðar Ömmu', 45),
('Ítalskt Lasagna', 90),
('Grænt Smoothie', 10);
