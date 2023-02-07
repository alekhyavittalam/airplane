import airplane from "airplane"
import { Record } from "airtable";
import { nextTick } from "process";

//Getting data from Airtable
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appQrGAqzzRPKTJkq');
var table_comments_assigned = base('comments_assigned_to_employees');
var base2 = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appm3YlMBVpZR4puP');
var table_employees = base2('list_of_employees');

const comments: any[] = [];
table_comments_assigned.select({
  view: "Grid view"
}).all(function(error,records) {
	if(error) { console.error(error); return;}
	comments.push(records.map(record => ({
		comment: record.get('comment'),
		comment_id: record.get('comment_id')
	}
    )));
});

const emps: any[] = [];
table_employees.select({
	view: "Grid view"
  }).all(function(error,records) {
	  if(error) { console.error(error); return;}
	  emps.push (records.map(record => ({
		  employee_id: record.get('employee_id'),
		  emp_first_name: record.get('emp_first_name'),
		  emp_last_name: record.get('emp_last_name')
	  })));
  });
  

function assignComments(comments_supabase) {
		 console.log(comments[0]);
		 console.log(emps);

		 const commentsArray = comments[0];
		 const employeesArray = emps[0];
	
	// Create a set of comment IDs from commentsAirtable
  	//const airtableCommentIds = new Set(commentsArray.map(c => c.comment_id));
	  const airtableCommentIds = new Set();
	commentsArray.forEach(comment => airtableCommentIds.add(comment.comment_id));
	console.log(airtableCommentIds);

  	
	// Filter commentsSupabase to get only unique comments (not in commentsAirtable)
	const uniqueComments = comments_supabase.filter(c =>!airtableCommentIds.has(c.comment_id));
	console.log(uniqueComments);
	// const uniqueComments = [{comment_id: 33456, comment:'Bad comment', comment_status: null}];
	// console.log(uniqueComments);
  
	uniqueComments.forEach(comment => {
	  const randomEmployeeIndex = Math.floor(Math.random() * employeesArray.length);
	  const randomEmployee = employeesArray[randomEmployeeIndex];
	  table_comments_assigned.create({
		"employee_id": randomEmployee.employee_id,
		"emp_first_name": randomEmployee.emp_first_name,
		"emp_last_name": randomEmployee.emp_last_name,
		"comment_id": comment.comment_id,
		"comment": comment.comment,
		"comment_status": comment.comment_status
	  });
	});
};


export default airplane.task(
	{
		slug: "comments_assigned_to_employees",
		name: "Comments assigned to employees",
		resources:{
			list_of_comments: "list_of_comments"
		},
		parameters: {
			employee_id: "integer"
		},	//passing in employee id as parameter to filter comments assigned to employees
	},

	// This is your task's entrypoint. When your task is executed, this
	// function will be called.

	async (params) => {

		const sql_comments = await airplane.sql.query(
			"list_of_comments",
			"select comment, comment_id from list_of_comments",
		)

		const sqlArr = Object.values(Object.values(sql_comments)[4]);

		assignComments(sqlArr[0]);

		base('comments_assigned_to_employees').select({
			view: 'Grid view',
		
		}).firstPage(function(err, records) {
			if (err) { console.error(err); return; }
			records.forEach(function(record) {	//looping through the records
				if (record.get('employee_id') == params.employee_id){	//checking is selected employee id is the same as record's employee id
					airplane.appendOutput(({employee_id:record.get('employee_id'), //displaying the record if it is a match
					emp_first_name : record.get('emp_first_name'), emp_last_name:record.get ('emp_last_name'), 
					comment_id : record.get('comment_id'), comment : record.get('comment'), 
					comment_status:record.get('comment_status'), record_id:record.get('record_id')}));
				}
				
			});
		});
}
)
