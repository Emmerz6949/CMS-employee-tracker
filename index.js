const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employTrack_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(` `);
  console.log(`Welcome to the Employees Tracker Content Management System command-line application!`);
  console.log(` `);
  start();
});

async function start() {
    try {
        const whatDo = await inquirer.prompt({
            name: "yado",
            type: "list",
            message: "What would you like to do?",
            choices: [
              "View All Departments",
              "View All Roles",
              "View All Employees",
              "Add a Department",
              "Add a Role",
              "Add an Employee",
              "Update an Existing Employee's Role",
              "Exit"
            ]
        });
        const {yado} = whatDo;
        if (yado === "View All Departments") {
            viewD();
        }
        else if (yado === "View All Roles") {
            viewR();
        }
        else if (yado === "View All Employees") {
            viewE();
        }
        else if (yado === "Add a Department") {
            addD();
        }
        else if (yado === "Add a Role") {
            addR();
        }
        else if (yado === "Add an Employee") {
            addE();
        }
        else if (yado === "Update an Existing Employee's Role") {
            updateER();
        }
        else {
            connection.end();
        }

    } catch (err) {
        console.log(err);
    }
}

function viewD() {
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;

        console.log(` `);
        console.table(results);
        start();
    });
}

function viewR() {
    connection.query("SELECT role.id, role.title FROM role", function(err, results) {
        if (err) throw err;

        console.log(` `);
        console.table(results);
        start();
    });
}

function viewE() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, employee.manager_id 
    FROM employee INNER JOIN role ON employee.role_id = role.id 
    INNER JOIN department ON role.department_id = department.id`, function(err, results) {
        if (err) throw err;

        console.log(` `);
        console.table(results);
        start();
    });
}

async function addD() {
    const newD = await inquirer.prompt({
        name: "dName",
        type: "input",
        message: "What is the name of the new department?"
    });
    const {dName} = newD;
    connection.query("INSERT INTO department (department) VALUES (?)", dName, function(err, results) {
        if (err) throw err;

        console.log(` `);
        console.table("Department Successfully Added!");
        console.log(` `);
        start();
    });
}

async function addR() {
    try {
        connection.query("SELECT department.id FROM department", async function(err, results) {
            try {
                if (err) throw err;
    
            const deptsR = results.map(function(dept) {
                return dept['id'];
            });
            const newR = await inquirer.prompt([
                {
                    name: "rTitle",
                    type: "input",
                    message: "What is the title of the new role?"
                },
                {
                    name: "rSalary",
                    type: "number",
                    message: "What is the salary of the new role?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                    }          
                },
                {
                    name: "rDId",
                    type: "list",
                    message: "What is the id of the department the new role belongs to?",
                    choices: deptsR
                }
            ]);
            const {rTitle, rSalary, rDId} = newR;
            connection.query("INSERT INTO role SET ?", 
            {
                title: rTitle, 
                salary: rSalary, 
                department_id: rDId
            }, 
            function(err, results) {
                if (err) throw err;
        
                console.log(` `);
                console.table("Role Successfully Added!");
                console.log(` `);
                start();
            });
            } catch (err) {
                console.log(err);
            }
        });

    } catch (err) {
        console.log(err);
    }
}

async function addE() {
    try {
        connection.query("SELECT role.id FROM role", async function(err, results) {
            try {
                if (err) throw err;
    
                const rolesE = results.map(function(role) {
                    return role['id'];
                });
                const newE = await inquirer.prompt([
                    {
                        name: "eFName",
                        type: "input",
                        message: "What is the first name of the new employee?"
                    },
                    {
                        name: "eLName",
                        type: "input",
                        message: "What is the last name of the new employee?"
                    },
                    {
                        name: "eRId",
                        type: "list",
                        message: "What is the id of the role of the new employee?",
                        choices: rolesE
                    },
                    {
                        name: "eM",
                        type: "confirm",
                        message: "Does this employee have a manager?",       
                    }
                    
                ]);
                const {eFName, eLName, eRId, eM} = newE;
                let eMId;
                
                if (!eM) {
                    eMId = null;

                    connection.query("INSERT INTO employee SET ?", 
                    {
                        first_name: eFName, 
                        last_name: eLName, 
                        role_id: eRId,
                        manager_id: eMId
                    }, 
                    function(err, results) {
                        if (err) throw err;
                
                        console.log(` `);
                        console.table("Employee Successfully Added!");
                        console.log(` `);
                        start();
                    });
                }
                else if (eM) {
                    connection.query("SELECT employee.id FROM employee", async function(err, results) {
                        try {
                            if (err) throw err;
                
                            const idsE = results.map(function(employee) {
                                return employee['id'];
                            });

                            const managerE = await inquirer.prompt({
                                name: "mEId",
                                type: "list",
                                message: "What is the employee id of the new employee's manager?",
                                choices: idsE
                            });
                            const {mEId} = managerE;
                            eMId = mEId;

                            connection.query("INSERT INTO employee SET ?", 
                            {
                                first_name: eFName, 
                                last_name: eLName, 
                                role_id: eRId,
                                manager_id: eMId
                            }, 
                            function(err, results) {
                                if (err) throw err;
                        
                                console.log(` `);
                                console.table("Employee Successfully Added!");
                                console.log(` `);
                                start();
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

async function updateER() {
    try {
        connection.query("SELECT employee.id FROM employee", async function(err, results) {
            try {
                if (err) throw err;
    
                const eIds = results.map(function(employee) {
                    return employee['id'];
                });

                connection.query("SELECT role.id FROM role", async function(err, results) {
                    try {
                        if (err) throw err;
            
                        const idsR = results.map(function(role) {
                            return role['id'];
                        });

                        const who = await inquirer.prompt([
                            {
                                name: "eId",
                                type: "list",
                                message: "What is the id of the employee whose role you would like to change?",
                                choices: eIds
                            },
                            {
                                name: "idR",
                                type: "list",
                                message: "What is the id of the role you would like to change to?",
                                choices: idsR
                            }
                        ]);
                        const {eId, idR} = who;

                        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [idR, eId], function(err, result) {
                            if (err) throw err;

                            console.log(` `);
                            console.table("Employee Role Successfully Updated!");
                            console.log(` `);
                            start();
                        });
                        
                    } catch (err) {
                        console.log(err);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
}
