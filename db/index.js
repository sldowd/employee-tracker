const { createPromptModule } = require('inquirer');
const connection = require('./connection');

//create ES6 class 
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllDepartments() {
    return this.connection.query(
      "SELECT department.* FROM department", 
      (err,res) => {
        if (err) throw err
      }
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
    ,(err,res) =>{
      if (err) throw err
    });
  }
  createDepartment(res) {
    return this.connection.promise().query(
      `INSERT INTO department (name) VALUES ('${deptName}')`
    )
  }
  createRole(res) {
    return this.connection.promise().query(
      `INSERT INTO role (name, salary, departnment) VALUES ('${res.name}', '${res.salary}', '${res.department}')`
    )
  }
  createEmployee(res) {
    return this.connection.promise().query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id)  VALUES ('${res.first}', '${res.last}', '${res.role}', '${res.manager}')`
    )
  }
  updateEmployeeRole(res) {
    return this.connection.promise().query(
      `UPDATE employee SET (role) VALUES ('${empRole}')`
    )
  }
}

// invoke creation of db with class
const db = new DB();

module.exports = db;