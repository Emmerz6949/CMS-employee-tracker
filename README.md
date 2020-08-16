# CMS - Employee Tracker

## Description

This repository was created so I could create a comand-line application that utilizes user input and a MySQL database to creare a Content Management System that keeps track of employees. You can watch a video demonstrating the application's functionallity by clicking [here](https://drive.google.com/file/d/1Ey31BQuIQdzrTeF16-RMi4iD2ERZ8gE9/view?usp=sharing).

![image](https://i.ibb.co/5hXbnzz/CMS-Employee-Tracker.png)

You can use the commits to follow my journey.



### How did I do it?

I used JavaScript and the following Node.js packages: installed via npm packages called "mysql", "inquirer", and "console.table" to write my applicatian's code. I used MySQL to write the needed database, as well as the sql files included in this repository.



### Installation

Make sure you have Node.js (https://nodejs.org/en/download/), MySQL Community Server (https://dev.mysql.com/downloads/mysql/), and MySQL Workbench (https://dev.mysql.com/downloads/workbench/) installed. And after you've cloned or downloaded your forked repository use the command "npm install" in the terminal to install the necessary "mysql", "inquirer", and "console.table" packages (make sure your terminal is in the same directory as the package.json file).



### Usage

To use my command-line application you'll nead to fork this repository and then clone or download the repository. You'll also need to utilize the sql files to set up the neccesary database and tables. Make sure you edit the index.js to include your MySQL server connection information. After that, if you have everything installed and your database and tables set up, you simply have to have your terminal in the same direcetory as index.js and use the command "node index.js" to run it. Once it runs you will be prompted to pick what you would like to do and given a variety of options to choose from; each option interacts with the database and tables in one way or another. Once you have finished utilizing the application, select Exit to end the connection and application.



### Credits

I used Node.js (https://nodejs.org/en/), MySQL (https://dev.mysql.com/), the "mysql" package (https://www.npmjs.com/package/mysql), the "inquirer" package (https://www.npmjs.com/package/inquirer), and the "console.table" package (https://www.npmjs.com/package/console.table).
