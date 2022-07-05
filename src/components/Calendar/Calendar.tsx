import axios from 'axios';
import Dayz from 'dayz';
// could also import the sass if you have a loader at dayz/dayz.scss
import "dayz/dayz.scss";
import moment from '../../utils/moment';
import { useEffect, useState } from 'react';
import TaskPopover from './TaskPopover';
import './Calendar.scss';
import { useAppDataContext } from '../../contexts/AppContext';

interface CalendarProps {
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
}

const getStatusClassName = (name?: string) => {
  return name ? name.toLowerCase().replaceAll(' ', '-').replaceAll("'", '') : '';
}

const Calendar = ({ selectedDay, setSelectedDay }: CalendarProps) => {

  const [tasks, setTasks] = useState<any>();
  const { statuses } = useAppDataContext();

  const getTasks = () => {
    axios
      .get(`/api/tasks`)
      .then((res) => {
        const dayzEvents = new Dayz.EventsCollection(res.data.map((task: any) => {
          const status = statuses.find((s: any) => s.id === task.status_id)
          return {
            content: `${task.task_group.project.name} - ${task.name}`,
            range: moment.range(moment(task.start_date), moment(task.end_date)),
            task,
            className: getStatusClassName(status?.name),
            afterSubmit: getTasks,
          }
        }))
        setTasks(dayzEvents);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (statuses) {
      getTasks()
    }
  }, [statuses])

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