import axios from 'axios';
import { useEffect, useState } from 'react';
import TaskGroupTable from '../components/TaskGroupTable/TaskGroupTable';
import MainLayout from '../layouts/MainLayout';

function DashboardPage() {

  const [taskGroups, setTaskGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const reloadTable = () => {
    axios
      .get("/api/task_groups")
      .then((res) => {
        setTaskGroups(res.data)
      })
      .catch((error) => console.error(error));
  }

  const resetUsers = () => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data)
      })
      .catch((error) => console.error(error));
  }

  const resetStatuses = () => {
    axios
      .get("/api/statuses")
      .then((res) => {
        setStatuses(res.data)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    reloadTable()
    resetUsers()
    resetStatuses();
  }, [])

  return (
    <MainLayout>
      Dashboard
      {taskGroups.map((tg: any) => (
        <TaskGroupTable taskGroup={tg} users={users} reloadFn={reloadTable} statuses={statuses} key={`${tg.name}-${tg.id}`} />
      ))}
    </MainLayout>
  );
}

export default DashboardPage;
