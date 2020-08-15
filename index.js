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
    connection.query("SELECT department.department FROM department", function(err, results) {
        if (err) throw err;

        console.log(` `);
        console.table(results);
        start();
    });
}

function viewR() {
    connection.query("SELECT role.title FROM role", function(err, results) {
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
