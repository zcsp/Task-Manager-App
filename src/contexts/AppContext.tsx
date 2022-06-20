import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AppDataContext = createContext<any>({});

export const useAppDataContext = () => useContext(AppDataContext);

function AppDataProvider({
  children,
}: PropsWithChildren<any>) {

  const [project, setProject] = useState<any>();
  const [currentTask, setCurrentTask] = useState<any>();
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const resetProject = (project_id: string) => {
    axios
      .get(`/api/projects/${project_id}`)
      .then((res) => {
        setProject({ ...res.data })
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
    resetUsers()
    resetStatuses();
  }, [])

  return (
    <AppDataContext.Provider
      value={{
        project,
        setProject,
        resetProject,
        users,
        resetUsers,
        statuses,
        resetStatuses,
        currentTask,
        setCurrentTask
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export default AppDataProvider;