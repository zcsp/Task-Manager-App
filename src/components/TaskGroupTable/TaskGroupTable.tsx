import DeleteTaskButton from '../DeleteTaskButton';
import TaskGroupNameInput from '../TaskGroupNameInput/TaskGroupNameInput';
import TaskNameInput from '../TaskNameInput/TaskNameInput';
import TaskStatusInput from '../TaskStatusInput/TaskStatusInput';
import TaskTimelineInput from '../TaskTimelineInput/TaskTimelineInput';
import TaskUserInput from '../TaskUserInput';
import './TaskGroupTable.scss';
import TaskGroupColorInput from '../TaskGroupColorInput/TaskGroupColorInput';
import Button from '../Button';
import axios from 'axios';
import { useAppDataContext } from '../../contexts/AppContext';

function TaskTable({ taskGroup, order }: { taskGroup: any; order: number; }) {

  const { resetProject, setCurrentTask } = useAppDataContext();

  const deleteTaskGroup = () => {
    if (window.confirm(`Do you want to delete the task group ${taskGroup.name}?`)) {
      axios
        .delete(`/api/task_groups/${taskGroup.id}`)
        .then((res) => {
          afterSubmit();
        })
        .catch((error) => console.error(error));
    }
  }

  const moveTaskGroup = (order: number) => {
    axios
      .put(`/api/task_groups/${taskGroup.id}/order`, { order })
      .then((res) => {
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }
  const moveTaskGroupUp = () => moveTaskGroup(order - 1)
  const moveTaskGroupDown = () => moveTaskGroup(order + 1)

  const afterSubmit = () => {
    resetProject(taskGroup.project_id)
  }

  if (!taskGroup) {
    return <>Loading...</>
  }

  return (
    <table className="task-group-table">
      <thead>
        <tr>
          <th colSpan={3} style={{ height: '1px' }}>
            <TaskGroupColorInput taskGroup={taskGroup} afterSubmit={afterSubmit} />
            <TaskGroupNameInput taskGroup={taskGroup} afterSubmit={afterSubmit} />
          </th>
          <th>
            Assignee
          </th>
          <th>
            Status
          </th>
          <th>
            Timeline
          </th>
          <th>
            <Button className="tg-move-up-button" onClick={moveTaskGroupUp}>
              &and;
            </Button>
            <Button className="tg-move-down-button" onClick={moveTaskGroupDown}>
              &or;
            </Button>
            <Button onClick={deleteTaskGroup}>
              x
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {taskGroup.tasks.map((task: any) => (
          <tr key={`${task.name}-${task.id}`}>
            <td colSpan={3}>
              <button className="sneaky-input task-name-button" onClick={() => setCurrentTask(task)}>
                <span>{task.name}</span>
              </button>
            </td>
            <td>
              {task.user}
              <TaskUserInput taskId={task.id} taskUserId={task.user_id} afterSubmit={afterSubmit} />
            </td>
            <td>
              <TaskStatusInput taskId={task.id} taskStatusId={task.status_id} afterSubmit={afterSubmit} />
            </td>
            <td>
              <TaskTimelineInput task={task} afterSubmit={afterSubmit} />
            </td>
            <td>
              <DeleteTaskButton taskId={task.id} afterSubmit={afterSubmit} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
