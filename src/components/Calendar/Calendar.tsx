import axios from 'axios';
import Dayz from 'dayz';
// could also import the sass if you have a loader at dayz/dayz.scss
import "dayz/dist/dayz.css";
import moment from '../../utils/moment';
import { useEffect, useState } from 'react';
import TaskPopover from './TaskPopover';
import './Calendar.scss';

interface CalendarProps {
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
}

const Calendar = ({ selectedDay, setSelectedDay }: CalendarProps) => {

  const [tasks, setTasks] = useState<any>();

  const getTasks = () => {
    axios
      .get(`/api/tasks`)
      .then((res) => {
        const dayzEvents = new Dayz.EventsCollection(res.data.map((task: any) => {
          return {
            content: task.name,
            range: moment.range(moment(task.start_date), moment(task.end_date)),
          }
        }))
        setTasks(dayzEvents);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getTasks()
  }, [])

  const handleEventClick = (ev: Event, event: any) => {
    event.set({ editing: !event.isEditing() });
  }

  const handleDayClick = (ev: Event, date: Date) => {
    setSelectedDay(date)
  }

  return (
    <Dayz
      events={tasks}
      onEventClick={handleEventClick}
      onDayClick={handleDayClick}
      dayEventHandlers={{
        onClick: handleDayClick
      }}
      editComponent={TaskPopover}
      highlightDays={[new Date(), selectedDay]}
    />
  )
}

export default Calendar;