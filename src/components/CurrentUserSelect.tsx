import axios from "axios";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useAppDataContext } from "../contexts/AppContext";

const CurrentUserSelect = () => {

  const { users, currentUser, setCurrentUser } = useAppDataContext();
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => setCurrentUser(e.target.value);

  if (!currentUser || !users) {
    return <>Loading...</>
  }

  return (
    <select placeholder="Select User" onChange={handleChange} value={currentUser.id} onBlur={handleChange}>
      {users.map((u: any) => (
        <option value={u.id}>{u.name}</option>
      ))}
    </select>
  )
}

export default CurrentUserSelect;