import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import DayTasks from '../../components/DayTasks';
import TaskGroupTable from '../../components/TaskGroupTable/TaskGroupTable';
import MainLayout from '../../layouts/MainLayout';
import moment from '../../utils/moment';
import RandomHashtag from '../../components/RandomHashtag';

function DashboardCalendar() {

  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  return (
    <>
      <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <DayTasks day={selectedDay} />
    </>
  );
}

export default DashboardCalendar;
