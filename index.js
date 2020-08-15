const mysql = require("mysql");
const inquirer = require("inquirer");

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
