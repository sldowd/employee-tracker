const { createPromptModule } = require('inquirer');
const connection = require('./connection');

//create ES6 class 
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT department.* FROM department"
    )
  }
  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.* FROM role"
    )
  }
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  createDepartment(deptName) {
    return this.connection.promise().query(
      `INSERT INTO department (name) VALUES ('${deptName}')`
    )
  }
  createRole(res) {
    return this.connection.promise().query(
      `INSERT INTO role (title, salary, department_id) VALUES ('${res.title}', '${res.salary}', '${res.department_id}')`
    )
  }
  createEmployee(res) {
    return this.connection.promise().query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id)  VALUES ('${res.first_name}', '${res.last_name}', '${res.role_id}', '${res.manager_id}')`
    )
  }
  updateEmployeeRole(res1, res2) {
    return this.connection.promise().query(
      `UPDATE employee SET role_id = ${res2} WHERE id = ${res1}`
    )
  }
}

// invoke creation of db with class
const db = new DB(connection);

module.exports = db;