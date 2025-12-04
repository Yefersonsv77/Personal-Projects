CREATE DATABASE crud_productos;

CREATE TABLE productos(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    categoria VARCHAR(100)
);