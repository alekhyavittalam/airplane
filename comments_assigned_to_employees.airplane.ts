import airplane from "airplane"
import { Record } from "airtable";
//import React from 'react';

//var getdetails=require('./list_of_employees');

//'import { getRecords } from "/Users/alekhya/airplane/list_of_employees"'

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appQrGAqzzRPKTJkq');
const table = base('comments_assigned_to_employees');

export default airplane.task(
	{
		slug: "comments_assigned_to_employees",
		name: "Comments assigned to employees",
		parameters: {employee_id: "integer"}
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.
	
	//getRecords()

	async (params) => {
		base('comments_assigned_to_employees').select({
			view: 'Grid view',
			//fields: ['employee_id', 'emp_first_name', 'emp_last_name']
		
		}).firstPage(function(err, records) {
			if (err) { console.error(err); return; }
			records.forEach(function(record) {
				if (record.get('employee_id') == params.employee_id){
					airplane.appendOutput({employee_id:record.get('employee_id'), emp_first_name : record.get('emp_first_name'), 
				emp_last_name:record.get ('emp_last_name'), comment_id : record.get('comment_id'), comment : record.get('comment'), 
				comment_status:record.get('comment_status'), record_id:record.get('record_id')});
				}
				
			});
		});
}
		
	//airplane.appendOutput({employee_id: 0, first_name: 'A', last_name: 'B'});


		// You can return data to show output to users.
		// Output documentation: https://docs.airplane.dev/tasks/output
	//return data;
	

)
