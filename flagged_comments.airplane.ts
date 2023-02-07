import airplane from "airplane"
import { Record } from "airtable";

//Getting data from the Airtable
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appQrGAqzzRPKTJkq');

export default airplane.task(
	{
		slug: "flagged_comments",
		name: "Flagged comments",
		parameters: {record_id: "shorttext"}	//parameter record id needed to identify which record to update
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.
	/**
	 * async takes in string argument
	 * It updates the comment_status to 'Flagged'
	 * @param params 
	 */

	async (params) => {
	base('comments_assigned_to_employees').update(params.record_id, {	//updates the particular record's comment status
		"comment_status": "Flagged"
	  }, function(err, record) {
		if (err) {
		  console.error(err);
		  return;
		}
	  })
	}  
)

