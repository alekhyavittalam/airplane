import airplane from "airplane"
import { Record } from "airtable";

//Getting data from Airtable
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appQrGAqzzRPKTJkq');

export default airplane.task(
	{
		slug: "comments_assigned_to_employees",
		name: "Comments assigned to employees",
		parameters: {employee_id: "integer"}	//passing in employee id as parameter to filter comments assigned to employees
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.

	async (params) => {
		base('comments_assigned_to_employees').select({
			view: 'Grid view',
		
		}).firstPage(function(err, records) {
			if (err) { console.error(err); return; }
			records.forEach(function(record) {	//looping through the records
				if (record.get('employee_id') == params.employee_id){	//checking is selected employee id is the same as record's employee id
					airplane.appendOutput({employee_id:record.get('employee_id'), //displaying the record if it is a match
					emp_first_name : record.get('emp_first_name'), emp_last_name:record.get ('emp_last_name'), 
					comment_id : record.get('comment_id'), comment : record.get('comment'), 
					comment_status:record.get('comment_status'), record_id:record.get('record_id')});
				}
				
			});
		});
}
)
