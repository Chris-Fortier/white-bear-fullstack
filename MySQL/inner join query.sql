-- What are all the hobbies Mike likes?

-- this will be an inner join (stuff that overlaps, most common type)
USE hobby_app;
SELECT -- this is what columns you want in your join table
    `users`.`id` AS `user_id`,
    `users`.`first_name`,
    `users`.`last_name`,
    `hobbies`.`id` AS `hobby_id`,
    `hobbies`.`name` AS `hobby_name`
FROM
    `users`
        INNER JOIN
    `xref_user_hobbies` ON `user_id` = `users`.`id`
        INNER JOIN
    `hobbies` ON `hobbies`.`id` = `xref_user_hobbies`.`hobby_id`
WHERE
	`users`.`first_name` = 'mike' -- if the name is unambiguous, you don't need to prefix with the table name