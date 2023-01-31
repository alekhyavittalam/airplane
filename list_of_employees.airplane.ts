import airplane from "airplane"
import { Record } from "airtable";
//import React from 'react';


//var getdetails=require('./list_of_employees');

//'import { getRecords } from "/Users/alekhya/airplane/list_of_employees"'

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appm3YlMBVpZR4puP');

const table = base('list_of_employees');

export default airplane.task(
	{
		slug: "list_of_employees",
		name: "List of employees",
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.
	
	//getRecords()

	async function getRecords(){
		base('list_of_employees').select({
		view: 'Grid view',
		fields: ['employee_id', 'emp_first_name', 'emp_last_name']
	
	}).firstPage(function(err, records) {
		if (err) { console.error(err); return; }

		records.forEach(function(record) {
			airplane.appendOutput({employee_id:record.get('employee_id'), emp_first_name : record.get('emp_first_name'), emp_last_name:record.get ('emp_last_name')});
		});
	})
}
		
	//airplane.appendOutput({employee_id: 0, first_name: 'A', last_name: 'B'});


		// You can return data to show output to users.
		// Output documentation: https://docs.airplane.dev/tasks/output
	//return data;
	

)

