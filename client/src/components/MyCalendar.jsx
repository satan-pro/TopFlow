import { useState } from "react";
import Calendar from "react-calendar";

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1 className="text-2xl font-semibold my-8">Calendar</h1>
      <Calendar
        className="bg-white rounded-lg p-8 font-semibold"
        onChange={setDate}
        value={date}
      />
    </div>
  );
}
