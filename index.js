const { prompt } = require('inquirer');
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
                {
                    name: 'Exit Program',
                    value: 'quit'
                }
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
            case 'quit': exitProgram();
            break;
        }
    })
}

function viewDepartments() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadMainPrompts());
};

function viewRoles() {
    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => loadMainPrompts());
};

function viewEmployees() {
    //view all employees
    db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
};

function addDepartment() {
    prompt([
        {
            type: 'input',
            value: 'deptname',
            message: 'Enter new department name.'
        }
    ])
    .then((res) => {
        let deptName = res;
        db.createDepartment(deptName);
    })
    .then(() => loadMainPrompts());
}

function addRole() {
    prompt([
        {
            type: 'input',
            value: 'rolename',
            message: 'Enter new role name.'
        },
        {
            type: 'input',
            value: 'salary',
            message: 'Enter new role salary.'
        },
        {
            type: 'input',
            value: 'department',
            message: 'Enter new role department.'
        },
    ])
    .then((res) => {
        db.createRole(res);
    })
    .then(() => loadMainPrompts());
};

function addEmployee() {
    prompt([
        {
            type: 'input',
            value: 'first',
            message: 'Enter new employee first name.'
        },
        {
            type: 'input',
            value: 'last',
            message: 'Enter new employee last name.'
        },
        {
            type: 'input',
            value: 'role',
            message: 'Enter new employee role.'
        },
        {
            type: 'input',
            value: 'manager',
            message: 'Enter new employee manager.'
        },
    ])
    .then((res) => {
        db.createEmployee(res);
    })
    .then(() => loadMainPrompts());
};

function updateEmployee() {
    prompt([
        {
            type: 'input',
            value: 'id',
            message: 'Enter ID of employee you wish to update'
        },
        {
            type: 'input',
            value:'role',
            message: 'Enter new role.'
        }
    ])
    .then((res) => {
        db.updateEmployeeRole(res)
    })    
    .then(() => loadMainPrompts());
};

function exitProgram() {
    process.exit();
};