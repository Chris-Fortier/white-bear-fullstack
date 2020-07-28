INSERT INTO `xref_user_hobbies` (
	`id`,
    `user_id`,
    `hobby_id`
)
	VALUES (
		'474d3b26-d115-436b-9694-361f1556c61f', -- mike likes guitar
        '05f65ad2-6049-4c7e-ae3d-5f76f1fc9f4d',
        '19f999bc-6a33-4158-97de-397b27e94755'
	),
    (
		'bbe47ea5-7181-4b2c-a032-adea8691a840', -- mike like video games
        '05f65ad2-6049-4c7e-ae3d-5f76f1fc9f4d',
        'b3fe3cb8-3601-45c2-9bd7-c27a63878e56'
	),
    (
		'72735cda-3392-4393-a9d8-613eb9ffd454', -- ryan likes movies
        'ef32a0a7-0b17-49b8-bfd9-a72a533c36b8',
        '5f099fb1-5bb4-4ac6-9182-75f5b8bda25a'
	),
    (
		'b98ad90c-e163-4db5-b5d7-07432a2216a6', -- ryan likes surfing
        'ef32a0a7-0b17-49b8-bfd9-a72a533c36b8',
        '16f01fe1-6264-4336-92c3-7116e33ce68b'
	),
    (
		'ae1d0384-656b-4851-a8b8-b2800f209c0d', -- ryan likes video games
        'ef32a0a7-0b17-49b8-bfd9-a72a533c36b8',
        'b3fe3cb8-3601-45c2-9bd7-c27a63878e56'
	);
    SELECT * FROM `xref_user_hobbies`;