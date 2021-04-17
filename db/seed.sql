INSERT INTO department (name)
VALUES
('Accounting'),
('Human Resources'),
('Bone Grinding'),
('Soup Making'),
('Milkshake Shaking');

INSERT INTO role (title, salary, department_id)
VALUES
('Manager', 80000, 3),
('Soup Thief', 300, 4),
('Shaker', 50000, 5),
('Guy', 15000, 1),
('Toby', 12, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Bob', 'Glumpy', 1, null),
('Larry', 'Bird', 3, 1),
('Steve', 'Man', 2, 1),
('Robert', 'Cromwell', 4, 1),
('Lisa', 'Lobe', 5, 1);