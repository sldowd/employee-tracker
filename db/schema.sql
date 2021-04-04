DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INTEGER PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    CONSTRAINT fk_role FOREIGN KEY (role_id) references role(id),
    CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) references employee(id)
);