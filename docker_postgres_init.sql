CREATE USER fourleaves WITH PASSWORD 'fourleaves' CREATEDB;

CREATE DATABASE fourleaves
    WITH
    OWNER = fourleaves
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


GRANT ALL PRIVILEGES ON DATABASE fourleaves TO fourleaves;
