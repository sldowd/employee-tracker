DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) references role(id),
    CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) references employee(id)
);