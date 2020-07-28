USE `white_bear_app`;
SELECT * FROM `users`;
SELECT * FROM `memory_cards`;

-- a log in
SELECT 
    `users`.`id`
FROM
    `users`
WHERE
    `users`.`email` = 'mike@gmail.com'
        AND `users`.`password` = 'replace_me';

-- get the abover user's memory cards with a search filter
SELECT 
    *
FROM
    `memory_cards`
WHERE
    `memory_cards`.`user_id` = '6eb4cf5f-f8d8-4e7c-9663-764438da6e18'
        AND (`memory_cards`.`imagery` LIKE '%saw%'
        OR `memory_cards`.`answer` LIKE '%saw%')
ORDER BY
    `memory_cards`.`created_at` DESC;