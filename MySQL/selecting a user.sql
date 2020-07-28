USE white_bear_app;

SELECT * FROM `users`;

SELECT
	`id`, `email`, `created_at`
FROM
	`users`
WHERE
	`email` = 'mike@gmail.com'
    AND `password` = 'replace_me'
LIMIT 1