-- Who are all the users that like the hobby with the id of "b3fe3cb8-3601-45c2-9bd7-c27a63878e56"?
SELECT * FROM `hobbies`;

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
	`hobbies`.`id` = 'b3fe3cb8-3601-45c2-9bd7-c27a63878e56'