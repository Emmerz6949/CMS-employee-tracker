-- Specified employTrack_db for use.
USE employTrack_db;

-- Inserts a set of records.
INSERT INTO department (department)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");
--         1             2              3           4

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Account Manager", 145000, 3), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);-- 
--                   1                           2                           3                                 4                               5                          6                               7                      8

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Darnell", "Miller", 1, null), ("Sasha", "Smith", 2, 1), ("Sam", "Van Holen", 2, 1), ("George", "Martinez", 3, null), ("Chloe", "Reid", 4, 4), ("Alfred", "Greene", 4, 4), ("June", "Singh", 5, null), ("Anthony", "Wallace", 6, 7), ("Diane", "Edwards", 7, null), ("Charlotte", "Hornstock", 8, 9), ("Adam", "Richards", 8, 9);
--                     1                             2                         3                             4                             5                          6                        7                               8                           9                                  10                           11                 
