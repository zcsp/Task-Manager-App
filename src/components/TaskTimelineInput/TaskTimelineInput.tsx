import axios from "axios";
import { useState } from "react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import './TaskTimelineInput.scss';

type DateValue = Date | null;

const getDateInCorrectType = (d: DateValue) => d === null ? null : new Date(`${d} 00:00`)

const getInitialDates: (dates: [DateValue, DateValue]) => [DateValue, DateValue] = dates => [getDateInCorrectType(dates[0]), getDateInCorrectType(dates[1])]

const TaskTimelineInput = ({ task, afterSubmit }: { task: any; afterSubmit: () => void; }) => {
  const [dates, setDates] = useState<[DateValue, DateValue]>(getInitialDates([task.start_date, task.end_date]));
  const handleChange = (dates: [DateValue, DateValue] | null) => {
    if (dates === null) {
      dates = [null, null]
    }
    setDates(dates);
  }
  const handleSubmit = () => {
    if (dates && task.start_date !== dates[0] &&
      task.end_date !== dates[1]) {
      axios
        .put(`/api/tasks/${task.id}`,
          {
            task: {
              start_date: dates[0] === null ? dates[0] : dates[0].toLocaleDateString(),
              end_date: dates[1] === null ? dates[1] : dates[1].toLocaleDateString(),
            }
          })
        .then((res) => {
          afterSubmit();
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <DateRangePicker
      className="task-daterange-picker"
      onChange={handleChange}
      value={dates}
      format="M/dd"
      onCalendarClose={handleSubmit}
      calendarIcon={null}
    />
  )
}

export default TaskTimelineInput;