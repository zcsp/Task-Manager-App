import axios from "axios";
import { useState } from "react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const getDateInCorrectType = (d: Date | null) => d === null ? null : new Date(`${d} 00:00`)

const getInitialDates: (dates: [Date | null, Date | null]) => [Date | null, Date | null] = dates => [getDateInCorrectType(dates[0]), getDateInCorrectType(dates[1])]

const TaskTimelineInput = ({ task, afterSubmit }: { task: any; afterSubmit: () => void; }) => {
  const [dates, setDates] = useState<[Date | null, Date | null]>(getInitialDates([task.start_date, task.end_date]));
  const handleChange = (dates: [Date, Date]) => {
    setDates(dates);
  }
  const handleSubmit = () => {
    if (task.start_date !== dates[0] &&
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
    <DateRangePicker onChange={handleChange} value={dates} format="M/dd" onCalendarClose={handleSubmit} />
  )
}

export default TaskTimelineInput;