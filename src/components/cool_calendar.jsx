import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 


const CoolCalendar = () => {
    const [date, setDate] = useState(new Date());

    const tileClassName = ({ date: tileDate, view }) => {
      // Highlight the current day
      if (
        tileDate.toDateString() === new Date().toDateString() &&
        view === "month"
      ) {
        return "highlight-day";
      }
      return null;
    };
  
    return (
      <div className="custom-calendar-container">
        <Calendar
          value={date}
          onChange={setDate}
          tileClassName={tileClassName}
          nextLabel="›" // Custom next button
          prevLabel="‹" // Custom previous button
          navigationLabel={({ date }) =>
            `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
          }
          showNeighboringMonth={false} // Hide days from previous/next months
        />
      </div>
    );
  };

export default CoolCalendar;
