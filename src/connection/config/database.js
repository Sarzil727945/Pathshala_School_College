var mysql = require('mysql');

var connections = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    database: 'college',
    password: ''
  });
  
  connections.query(function (error) {
    if (!!error) {
      const data = "select * from 	user_role";
      connections.query(data, function (error, result) {
        // console.log(result)
      })
    } else {
     console.log(error, 'Error')
    }
  });

  module.exports = connections