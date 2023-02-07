import airplane from "airplane"
import { Record } from "airtable";

//pulling resource from Airtable by assigning api key and base id
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appm3YlMBVpZR4puP');

export default airplane.task(
	{
		slug: "list_of_employees",
		name: "List of employees",
	},
	// This is your task's entrypoint. When your task is executed, this
	// function to display the records will be called

	/**
	 * async function displays the list of employees
	 */

	async function getRecords(){
		base('list_of_employees').select({
		view: 'Grid view',
		fields: ['employee_id', 'emp_first_name', 'emp_last_name']
	
	}).firstPage(function(err, records) {
		if (err) { console.error(err); return; }

		records.forEach(function(record) {	//looping through each record
			airplane.appendOutput({employee_id:record.get('employee_id'), emp_first_name : record.get('emp_first_name'), 
			emp_last_name:record.get ('emp_last_name')});	//outputting only the necessary columns
		});
	})
}
)

