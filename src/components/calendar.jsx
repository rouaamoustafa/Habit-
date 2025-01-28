import React from "react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale"; 
import "../style/calendar.css";

const Calendar = ({ direction, translations }) => {
  const t = translations[direction]; 
  const today = new Date();

  const locale = direction === "rtl" ? ar : enUS; 

  return (
    <div className="calendar">
      <h5>{t.TodaysDate}</h5> 
      <div className="date">
        <span>{format(today, "EEEE", { locale })}</span>, 
        <span>{format(today, "MMMM dd", { locale })}</span>, 
        <span>{format(today, "yyyy", { locale })}</span> 
      </div>
    </div>
  );
};

export default Calendar;
