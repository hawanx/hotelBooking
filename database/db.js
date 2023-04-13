const Pool = require('pg').Pool;

const pool =new Pool({

    user:"postgres",
    password:"sanjay67",
    host:"localhost",
    port:5432,
    database:"hotel"     

});
    
module.exports  = pool;