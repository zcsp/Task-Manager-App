import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import DayTasks from '../../components/DayTasks';
import TaskGroupTable from '../../components/TaskGroupTable/TaskGroupTable';
import MainLayout from '../../layouts/MainLayout';
import './DashboardPage.scss';
import moment from '../../utils/moment';
import RandomHashtag from '../../components/RandomHashtag';

function DashboardPage() {

  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  return (
    <MainLayout>
      <div id="dashboard-content">
        <h1>
          It's {moment().format('dddd LL')} today.
        </h1>
        <RandomHashtag />
        <div id="dashboard-grid">
          <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          <DayTasks day={selectedDay} />
        </div>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
