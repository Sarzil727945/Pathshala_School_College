var mysql = require('mysql');

var connections = mysql.createConnection({
    // host: 'localhost',
    // host: '192.168.0.108',
    port:'3306',
    user: 'root',
    password: '',
    database: 'college'
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