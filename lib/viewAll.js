const mysqlQuery = require('./mysqlQuery');
const buildTable = require('./buildTable');


function viewAll(query) {

  data = mysqlQuery(query);
  // let headers = [];
  // let data;
  // switch (query) {

  //   case 'all-departments':
  //     // headers = ['ID', 'Department Name'];
  //     data = mysqlQuery('all-departments');
  //     break;

  //   case 'role':
  //     headers = ['ID', 'Job Title', 'Salary', 'Department'];
  //     break;

  //   case 'employee':
  //     headers = ['ID', 'First Name', 'Last Name', 'Job Title', 'Salary', 'Manager'];
  //     break;

  // }

  buildTable(data);

    
}


// exports from this module to other modules    
module.exports = viewAll
