import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from '../../utils/moment';

interface DayTasksProps {
  day: Date;
}

const DayTasks = ({ day }: DayTasksProps) => {

  const [tasks, setTasks] = useState<any[]>([]);

  const getTasks = () => {
    axios
      .get(`/api/tasks?date=${day}`)
      .then((res) => {
        console.log(res.data)
        setTasks(res.data)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getTasks();
  }, [day])

  return (
    <div>
      <h3>
        Tasks for {moment(day).format('MMMM Do')}
      </h3>
      <div>
        {tasks.map((task) => (
          <div>
            {task.task_group.project.name} - {task.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayTasks;