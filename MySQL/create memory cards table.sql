SHOW TABLES;

CREATE TABLE `memory_cards`(
	`id` CHAR(36) PRIMARY KEY, /* fixed length of string uuid */
	`imagery` VARCHAR(280) NOT NULL,
    `answer` VARCHAR(280) NOT NULL,
	`user_id` CHAR(36) NOT NULL, -- foreign key
	`created_at` BIGINT UNSIGNED NOT NULL,
	`next_attempt_at` BIGINT UNSIGNED NOT NULL,
	`last_attempt_at` BIGINT UNSIGNED NOT NULL,
	`total_successful_attempts` SMALLINT UNSIGNED NOT NULL,
	`level` TINYINT UNSIGNED NOT NULL,
    CONSTRAINT `fk_memory_card_user_id`
		FOREIGN KEY (`user_id`)
        REFERENCES `users`(`id`)
        ON UPDATE CASCADE -- makes it so if the id is updated, it will update wherever it was referenced
        ON DELETE RESTRICT
);

DROP TABLE `memory_cards`;