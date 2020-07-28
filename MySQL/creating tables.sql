SHOW DATABASES;

CREATE DATABASE white_bear_app;

USE white_bear_app;

CREATE TABLE users(
	`id` CHAR(36) PRIMARY KEY, /* fixed length of string uuid */
    `email` VARCHAR(320) NOT NULL, /* 320 is the longest possible email address */
    `password` VARCHAR(128) NOT NULL, /* hashed password, 128 is to future proof if we want to use 128-character hashes */
    `created_at` BIGINT UNSIGNED NOT NULL/* must be snake case as SQL is not case sensitive */
);

SHOW TABLES;

DESC `users`;