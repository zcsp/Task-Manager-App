import { Link as RrdLink } from 'react-router-dom';
import DeleteTaskButton from '../DeleteTaskButton';
import NewTaskFormRow from '../NewTaskFormRow';
import TaskGroupNameInput from '../TaskGroupNameInput/TaskGroupNameInput';
import TaskNameInput from '../TaskNameInput';
import TaskStatusInput from '../TaskStatusInput';
import TaskTimelineInput from '../TaskTimelineInput';
import TaskUserInput from '../TaskUserInput';
import './TaskGroupTable.scss';

function TaskTable({ taskGroup, users, statuses, reloadFn }: { taskGroup: any; users: any[]; statuses: any[]; reloadFn: () => void; }) {

  const getTimeline = (startDate: string, endDate: string) => (
    endDate ? `${startDate} - ${endDate}` : startDate
  )

  if (!taskGroup) {
    return <>Loading...</>
  }

  return (
    <table className="task-group-table">
      <thead>
        <tr>
          <td colSpan={3}>
            <TaskGroupNameInput taskGroup={taskGroup} afterSubmit={() => reloadFn()} />
          </td>
          <td>
            Assignee
          </td>
          <td>
            Status
          </td>
          <td>
            Timeline
          </td>
          <td />
        </tr>
      </thead>
      <tbody>
        {taskGroup.tasks.map((task: any) => (
          <tr key={`${task.name}-${task.id}`}>
            <td colSpan={3}>
              <TaskNameInput taskId={task.id} taskName={task.name} afterSubmit={() => reloadFn()} />
            </td>
            <td>
              {task.user}
              <TaskUserInput taskId={task.id} taskUserId={task.user_id} users={users} afterSubmit={() => reloadFn()} />
            </td>
            <td>
              <TaskStatusInput taskId={task.id} taskStatusId={task.status_id} statuses={statuses} afterSubmit={() => reloadFn()} />
            </td>
            <td>
              {getTimeline(task.startDate, task.endDate)}
              <TaskTimelineInput task={task} afterSubmit={() => reloadFn()} />
            </td>
            <td>
              <DeleteTaskButton taskId={task.id} afterSubmit={() => reloadFn()} />
            </td>
          </tr>
        ))}
        <NewTaskFormRow taskGroup={taskGroup} afterSubmit={() => reloadFn()} />
      </tbody>
    </table>
  );
}

export default TaskTable;
