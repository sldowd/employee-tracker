const prompt = require('inquirer');
const db = require('./db');

init();

function init() {
    loadMainPrompts()
}

function loadMainPrompts() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'view_depts'
                },
                {
                    name: 'View All Roles',
                    value: 'view_roles'
                },
                {
                    name: 'View All Employees',
                    value: 'view_emps'
                },
                {
                    name: 'Add a Department',
                    value: 'add_dept',
                },
                {
                    name: 'Add a Role',
                    value: 'add_role'
                },
                {
                    name: 'Add an Employee',
                    value: 'add_emp'
                },
                {
                    name: 'Update an Employee Role',
                    value: 'update_emp'
                },
            ]
        }

    ])
    .then((res) => {
        let choice = res.choice
        //switch 
        switch(choice) {
            case 'view_depts': viewDepartments();
            break;
            case 'view_roles': viewRoles();
            break;
            case 'view_emps': viewEmployees();
            break;
            case 'add_dept': addDepartment();
            break;
            case 'add_role': addRole();
            break;
            case 'add_emp': addEmployee();
            break;
            case 'update_emp': updateEmployee();
            break;
        }
    })
}

function viewDepartments() {
    db.findAllDepartments
    .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadMainPrompts());
}

function viewRoles() {
    db.findAllRoles
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => loadMainPrompts());
}

function viewEmployees() {
    //view all employees
    db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function addDepartment() {
    db.createDepartment().then(() => loadMainPrompts());
}

function addRole() {
    db.createRole().then(() => loadMainPrompts());
}

function addEmployee() {
    db.createEmployee().then(() => loadMainPrompts());
}

function updateEmployee() {
    db.updateEmployee().then(() => loadMainPrompts());
}

