-- run this first to use the correct database
USE white_bear_app;

-- show the users table
SELECT * FROM users;

-- add a new user to the users table
INSERT INTO `users` (
	`id`,
    `email`,
    `password`,
    `created_at`
)
VALUES (
	'45901cde-e4f3-4d3e-81a1-50723a722e06',
	'chris@gmail.com',
	'$2b$12$CTUkzdqf7Zmc6ssH2oYrAOnZxOpUkooSLo49QmoxgknbtE8.5fqTC',
	1593797538338
);