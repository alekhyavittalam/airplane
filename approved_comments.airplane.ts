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
		slug: "approved_comments",
		name: "Approved comments",
		parameters: {record_id: "shorttext"}
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.
	
	//getRecords()

	async (params) => {
	base('comments_assigned_to_employees').update(params.record_id, {
		"comment_status": "Approved"
	  }, function(err, record) {
		if (err) {
		  console.error(err);
		  return;
		}
		//console.log(record.id);
	  })
	}  
	//airplane.appendOutput({employee_id: 0, first_name: 'A', last_name: 'B'});


		// You can return data to show output to users.
		// Output documentation: https://docs.airplane.dev/tasks/output
	//return data;
)

