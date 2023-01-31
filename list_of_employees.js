var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appm3YlMBVpZR4puP');

const table = base('list_of_employees');

base('list_of_employees').select({
    view: 'Grid view',
    fields: ['employee_id', 'emp_first_name', 'emp_last_name']

}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    records.forEach(function(record) {
        console.log({employee_id:record.get('employee_id'), emp_first_name : record.get('emp_first_name'), emp_last_name:record.get ('emp_last_name')});
    });
});

//async function getRecords(){
  //  return await table.select({fields:['employee_id', 'first_name', 'last_name']}).firstPage();
    
    //}
    //(
      //  async() =>{
        //    console.log(await getRecords())
        //}
    //) ()



//module.exports.getRecords=getRecords();
