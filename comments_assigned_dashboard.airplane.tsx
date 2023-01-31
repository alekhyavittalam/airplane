import { Stack, Table, Title, useComponentState} from "@airplane/views";
import airplane from "airplane";

// Put the main logic of the view here.
// Views documentation: https://docs.airplane.dev/views/getting-started
const CommentDashboard = () => {
  const employees = useComponentState("employees");
  const selectedEmployee = employees.selectedRow;

  const comments = useComponentState("comments");
  const selectedComment =comments.selectedRow;

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
          slug: "comments_assigned_to_employees",
          params: { employee_id: selectedEmployee.employee_id },
        }}
        rowActions={[
          {
            slug: "flagged_comments",
            label: 'Flag',
            //params: {record_id: selectedComment.record_id}
          },
          {
            slug: "approved_comments",
            label: 'Approve',
          }
        ]}
       
        />
      )}
       {selectedComment && (
          <Table
          id="comments"
          task={{
            slug:"flagged_comments",
            params:{record_id: selectedComment.record_id}
          }}
          />
        )}
        {selectedComment && (
          <Table
          id="comments"
          task={{
            slug:"approved_comments",
            params:{record_id: selectedComment.record_id}
          }}
          />
        )}
    </Stack>
    </Stack> 
  );
};

export default CommentDashboard;

