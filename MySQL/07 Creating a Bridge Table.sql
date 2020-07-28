CREATE DATABASE `hobby_app`;
USE `hobby_app`; -- sets the current database to this
CREATE TABLE `users` (
	`id` CHAR(36) PRIMARY KEY,
    `first_name` VARCHAR(988) NOT NULL,
    `last_name` VARCHAR(988) NOT NULL
);
CREATE TABLE `hobbies` (
    `id` CHAR(36) PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);
CREATE TABLE `xref_user_hobbies` (
    `id` CHAR(36) PRIMARY KEY,
    `user_id` CHAR(36) NOT NULL,
    `hobby_id` CHAR(36) NOT NULL,
    CONSTRAINT `fk_xref_user_hobbies_user` FOREIGN KEY (`user_id`)  -- the name of the constraint, the name of the column in this table
        REFERENCES `users` (`id`) -- table (column)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT `fk_xref_user_hobbies_hobby` FOREIGN KEY (`hobby_id`) -- fk means foreign key, xref for cross reference, name of this table, name of the foreign item
        REFERENCES `hobbies` (`id`)
        ON UPDATE CASCADE ON DELETE RESTRICT
);
DESC `xref_user_hobbies`;