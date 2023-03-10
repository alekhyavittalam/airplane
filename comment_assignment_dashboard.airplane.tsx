import { Stack, Table, Title, useComponentState} from "@airplane/views";
import airplane from "airplane";

const CommentDashboard = () => {
  const employees = useComponentState("employees"); //storing data of employees to be rendered to the view
  const selectedEmployee = employees.selectedRow; //defining employee in selected row

  const comments = useComponentState("comments"); //storing data of comments to be rendered to the view
  const selectedComment =comments.selectedRow;  //defining comment in selected row

  return (
    <Stack>
      <Title> Comments Assignment</Title> 
    <Stack>
      <Table
        id="employees"
        title = "Employees"
        task="list_of_employees"
        rowSelection = "single"
      />
      {selectedEmployee && (
        <Table
        id="comments"
        title={`Comments: ${selectedEmployee.emp_first_name + " " + selectedEmployee.emp_last_name}`}
        hiddenColumns={["record_id"]}
        task={{
          slug: "comments_assigned_to_employees", //calling task comments assigned to employees
          params: { employee_id: selectedEmployee.employee_id },  //passing in employee id as parameter to filter comments assigned to employees
        }}
        rowActions={[ //creating buttons to click in order to approve or flag comments
          {
            slug: "approved_comments",
            label: 'Approve',
          },
          {
            slug: "flagged_comments",
            label: 'Flag',
          }
        ]}
       
        />
      )}
       {selectedComment && (
          <Table
          id="comments"
          task={{
            slug:"approved_comments",  //calling approved comments task
            params:{record_id: selectedComment.record_id} //passing record id as param to identify which record to update
          }}
          />
        )}
        {selectedComment && (
          <Table
          id="comments"
          task={{
            slug:"flagged_comments", //calling flagged comments task
            params:{record_id: selectedComment.record_id} //passing record id as param to identify which record to update
          }}
          />
        )}
    </Stack>
    </Stack> 
  );
};

 //exporting the view

export default airplane.view(
  {
    slug: "comment_assignment_dashboard",
    name: "Comment Assignment Dashboard",
  },
  CommentDashboard
);
