import airplane from "airplane"
import { Record } from "airtable";

//Getting data from Airtable
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyj1WtHcX2Q7mgS3'}).base('appQrGAqzzRPKTJkq');

export default airplane.task(
	{
		slug: "approved_comments",
		name: "Approved comments",
		parameters: {record_id: "shorttext"}	//passing param record id to identify which record to update
	},

	/**
	 * async takes in string argument
	 * It updates the comment_status to 'Approved'
	 * @param params 
	 */
	
	async (params) => {
	base('comments_assigned_to_employees').update(params.record_id, {	//record id identifies which record to update
		"comment_status": "Approved"	//comment status is updated to approved
	  }, function(err, record) {
		if (err) {
		  console.error(err);
		  return;
		}
	  })
	  
	} 
)

