# Employee Tracker

## Description 

Employee Tracker is a command-line content management system designed to interface with and manage an employee database. This application was built using [Node.js](https://nodejs.org/en), [Inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4), and [MySQL](https://www.mysql.com/). To explore the application, the repo includes schema and seed files for a sample database with three tables: ```employee```, ```department```, and ```role```.

This project required a deeper understanding of MySQL queries and how to interface with a MySQL database using Node.js. An extensive set of queries were developed to allow the user to retrieve desired data and to make modifications to the database. Available modifications include adding employees, departments, and roles; modifying an employee's role and manager; and deleting employees, departments, and roles.

Additionally, a multi-level command-line menu interface was required to navigate between and select the desired MySQL queries. Modularization was necessary to create an easily scalable framework. After the basic structure was completed, it was then much easier to add additional capabilities and their corresponding menu options.


## Installation

Copy all files and folders from the repo to the desired location. On the command line, navigate to the installation directory and install dependencies with the command

```
npm install
```

Create and seed the database from a MySQL command line in the same directory with the commands

```
source db/schema.sql;
source db/seeds.sql;
```
Update the password in file ```/lib/mysqlQuery.js``` as desired.


## Usage 

To run the application, use the command

```
npm start
```
or
```
node index.js
```
When the application is loaded, the user is presented a welcome message and the main menu, with options **View**, **Add**, **Modify**, **Delete**, and **Exit**. Arrow keys are used to move up and down, and the Enter key is used to select the desired menu option.

![Welcome and Main Menu](assets/images/main-menu.png)

After selecting **View**, the view menu is displayed. View menu options include **Departments**, **Roles**, **Employees**, and **Go back**, which returns the user to the main menu.

![View Menu](assets/images/view-menu.png)

After selecting **Departments**, the view departments sub-menu is displayed. View departments menu options include **All Departments**, **Total Budget by Department**, and **Go back**, which returns the user to the view menu.

![View Departments Menu](assets/images/view-departments-menu.png)

After selecting **All Departments**, a table is displayed listing all departments, and the user is returned to the main menu.

![View All Departents](assets/images/view-all-departments.png)

After selecting **Total Budget by Department**, a table is displayed listing all departments and their total budgets, sorted in descending order. Total budgets are calculated by adding the salaries of all employee roles in each department.
The user is again returned to the main menu.

![View Total Budget](assets/images/total-budget.png)

After selecting **Roles** from the view menu, a table is displayed listing all roles, sorted alphabetically, each with its respective salary and department.

![View Roles](assets/images/roles-detail.png)

After selecting **Employees** from the view menu, the view employees sub menu is displayed. View employees menu options include **Alphabetical by Last Name**, **Alphabetical by Department**, and **Alphabetical by Manager**.

![View Employees Menu](assets/images/view-employees-menu.png)


After selecting **Alphabetical by Last Name**, a table is displayed listing all employees, including First Name, Last Name, Job Title, Salary, Department, Manager First Name, and Manager Last Name, sorted in alphabetical order by last name. Selecting **Alphabetical by Department** or **Alphabetical by Manager** will display the same data with the specified sort criteria.

![View Employees](assets/images/view-all-employees.png)

After selecting **Add** from the main menu, the add menu is displayed. Add menu options include **Add a department**, **Add a role**, **Add an employee**, and **Go back**, which returns the user to the main menu.

![Add Menu](assets/images/add-menu.png)

After selecting **Add a department**, .

![View Roles](assets/images/roles-detail.png)


## Credits

I used [Node.js](https://nodejs.org/en) to build a command-line application.

I used [Inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4) to create a menu system of user prompts and user input collection.

I used [MySQL](https://www.mysql.com/), specifically [MySQL 2](https://www.npmjs.com/package/mysql2), to interface with the database.

I used [CLI Table](https://www.npmjs.com/package/cli-table) to render unicode-aided tables on the command-line for presenting MySQL query results.

I used [chalk](https://www.npmjs.com/package/chalk/v/4.1.2) to provide color formatting and styling to the command-line.


## License

Please refer to the LICENSE in the repo.

---