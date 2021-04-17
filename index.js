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
      .catch((err) => console.error(err))
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
            name: 'deptName',
            message: 'Enter new department name.'
        }
    ])
    .then((res) => {
        let deptName = res.deptName;
        db.createDepartment(deptName);
    })
    .then(() => loadMainPrompts());
}

function addRole() {
    prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter new role name.'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter new role salary.'
        },
        {
            type: 'input',
            name: 'department_id',
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
            name: 'first_name',
            message: 'Enter new employee first name.'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter new employee last name.'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter new employee role.'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter new employee manager.'
        },
    ])
    .then((res) => {
        db.createEmployee(res);
    })
    .then(() => loadMainPrompts());
};

function updateEmployee() {
    db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      //map employee names from call
      let employeeArr = employees.map(employee => {
          let choices = {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
          }
          return choices;
      })
      prompt([
          {
            type: 'list',
            name: 'emp_id',
            message: 'Which employee would you like to update?',
            choices: employeeArr
          }
      ])
      .then((employee) => {
          db.findAllRoles()
          .then(([roleObj]) => {
              let roleArr = roleObj.map(role => {
                  let roleChoices = {
                      name: `${role.title}`,
                      value: role.id
                  }
                  return roleChoices
              })
              prompt([
                  {
                      type: 'list',
                      name: 'role_id',
                      message: 'Choose new role for employee.',
                      choices: roleArr
                  }
              ])
              .then((role) => {
                db.updateEmployeeRole(employee.emp_id, role.role_id)
              })
            .then(() => loadMainPrompts());
          })
      })    
    })
};

function exitProgram() {
    process.exit();
};