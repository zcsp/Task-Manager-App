import TaskStatusInput from "../TaskStatusInput/TaskStatusInput";
import TaskTimelineInput from "../TaskTimelineInput/TaskTimelineInput";
import TaskUserInput from "../TaskUserInput";

const TaskForm = ({ task, afterSubmit }: any) => {
  return (
    <form>
      <h4 style={{ marginTop: 0, marginBottom: '4px' }}>
        {task.task_group.project.name} - {task.name}
      </h4>
      <TaskUserInput taskId={task.id} taskUserId={task.user_id} afterSubmit={afterSubmit} />
      <TaskStatusInput taskId={task.id} taskStatusId={task.status_id} afterSubmit={afterSubmit} />
      <TaskTimelineInput task={task} afterSubmit={afterSubmit} />
    </form>
  )
}

export default TaskForm;