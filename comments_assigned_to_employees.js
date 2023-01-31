var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appQrGAqzzRPKTJkq');

const table = base('comments_assigned_to_employees');

base('comments_assigned_to_employees').select({
    view: 'Grid view',
    //fields: ['employee_id', 'emp_first_name', 'emp_last_name']

}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    records.forEach(function(record) {
        console.log({employee_id:record.get('employee_id'), emp_first_name : record.get('emp_first_name'), 
        emp_last_name:record.get ('emp_last_name'), comment_id : record.get('comment_id'), 
        comment : record.get('comment'), comment_status : record.get('comment_status')});
    });
});