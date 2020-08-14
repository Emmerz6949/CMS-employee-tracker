-- Create the database employTrack_db and specified it for use.
CREATE DATABASE employTrack_db;
USE employTrack_db;

-- Create the table department.
CREATE TABLE department (
  id int AUTO_INCREMENT,
  department varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

-- Create the table role.
CREATE TABLE role (
  id int AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal NOT NULL,
  department_id int NOT NULL,
  PRIMARY KEY(id)
);

-- Create the table employee.
CREATE TABLE employee (
  id int AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id  int NOT NULL,
  manager_id int,
  PRIMARY KEY(id)
);
