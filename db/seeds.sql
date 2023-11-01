INSERT INTO department (name) VALUES
    ('Rebellion'),
    ('Scoundrels'),
    ('Cloud City'),
    ('Galactic Empire'),
    ('Independent'),
    ('Criminal Underworld');

INSERT INTO role (title, salary, department_id) VALUES
    ('Jedi Knight', 0, 1),
    ('Princess', 900000, 1),
    ('Smuggler', 80000, 2),
    ('Wookiee Warrior', 85000, 2),
    ('Jedi Master', 0, 1),
    ('Administrator', 95000, 3),
    ('Protocol Droid', 75000, 1),
    ('Astromech Droid', 70000, 1),
    ('Dark Lord of the Sith', 150000, 4),
    ('Galactic Emperor', 200000, 4),
    ('X-wing Pilot', 85000, 1),
    ('Co-pilot', 75000, 3),
    ('Fleet Admiral', 120000, 1),
    ('Chief of State', 180000, 1),
    ('Bounty Hunter', 90000, 5),
    ('Crime Lord', 180000, 6),
    ('Imperial Officer', 95000, 4),
    ('Chief Administrative Aide', 80000, 3),
    ('Rebel Alliance Officer', 95000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Leia', 'Organa', 2, NULL),
    ('Yoda', '', 5, NULL),
    ('Emperor', 'Palpatine', 10, NULL),
    ('Mon', 'Mothma', 14, NULL),
    ('Jabba', 'Hutt', 16, NULL),
    ('Lando', 'Calrissian', 6, 1),
    ('C-3PO', '', 7, 1),
    ('Obi-Wan', 'Kenobi', 5, 2),
    ('Darth', 'Vader', 9, 3),
    ('Admiral', 'Ackbar', 13, 4),
    ('General', 'Rieekan', 19, 4),
    ('Boba', 'Fett', 15, 5),
    ('Lobot', '', 18, 6),
    ('Nien', 'Nunb', 12, 6),
    ('Luke', 'Skywalker', 1, 8),
    ('Admiral', 'Piett', 17, 9),
    ('Admiral', 'Ozzel', 17, 9),
    ('Admiral', 'Motti', 17, 9),
    ('Captain', 'Needa', 17, 9),
    ('Admiral', 'Jerjerrod', 17, 9),
    ('General', 'Veers', 17, 9),
    ('Wedge', 'Antilles', 11, 10),
    ('R2-D2', '', 8, 15),
    ('Biggs', 'Darklighter', 11, 22),
    ('Han', 'Solo', 3, 26),
    ('Chewbacca', '', 4, 26);