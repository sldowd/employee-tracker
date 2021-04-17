// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hotdog666',
  database: 'employee_tracker'
});

connection.connect(function(err) {
    if (err) {
        return console.error(err.message)
    } 
    console.log('Connected to employee tracker database.');
});

module.exports = connection;