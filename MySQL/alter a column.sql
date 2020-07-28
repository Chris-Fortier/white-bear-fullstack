USE loadout_app;

SELECT * FROM users;

-- change the password format to 60 characters because we are using bcrypt
ALTER TABLE
	users
MODIFY COLUMN
	`password` CHAR(60) NOT NULL;
    
-- add a column called username
ALTER TABLE
	users
ADD COLUMN
	username VARCHAR(32);
    
-- add a column for last login
ALTER TABLE
	users
ADD COLUMN
	last_login_at BIGINT UNSIGNED;
    
-- change the email field to not be required (needed to do this so I can make new accounts with user name only)
ALTER TABLE
	users
MODIFY COLUMN
	email VARCHAR(320)
