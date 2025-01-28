import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, addDays, isSameDay, isToday, subMonths, addMonths, getDay } from "date-fns";
import "../style/myCalendar.css";

const CoolCalendar = ({totalCalories}) => {
   const [currentDate, setCurrentDate] = useState(new Date());
     const [value, setValue] = useState("");
     const [dailyValues, setDailyValues] = useState({});
   
     const startDate = startOfMonth(currentDate);
     const endDate = endOfMonth(currentDate);
   
     // Get the weekday of the first day of the month (0 = Sunday, 1 = Monday, etc.)
     const startDayOfWeek = getDay(startDate); // Get the starting day of the month
   
     const days = [];
     let day = startDate;
   
     // Fill in the days leading up to the first day of the month
     for (let i = 0; i < startDayOfWeek; i++) {
       days.push(null); // Adding empty cells before the first day of the month
     }
   
     // Add the days of the month
     while (day <= endDate) {
       days.push(day);
       day = addDays(day, 1);
     }
   
     // Function to handle value change for the input
     const handleValueChange = (e) => {
       setValue(e.target.value);
     };
   
     // Function to save the value for the specific date
     const handleSave = (day) => {
       if (value.trim()) {
         setDailyValues((prev) => ({
           ...prev,
           [format(day, "yyyy-MM-dd")]: value,
         }));
         setValue(""); // Clear the input field after saving
       }
     };
   
     const handlePreviousMonth = () => {
       setCurrentDate(subMonths(currentDate, 1));
     };
   
     const handleNextMonth = () => {
       setCurrentDate(addMonths(currentDate, 1));
     };
   
      return (
       <div className="habit-container">
         <div className="habit-header-container">
           <button className="habit-nav-button" onClick={handlePreviousMonth}>
             &lt;
           </button>
           <h2 className="habit-header">{format(currentDate, "MMMM, yyyy")}</h2>
           <button className="habit-nav-button" onClick={handleNextMonth}>
             &gt;
           </button>
         </div>
   
         <div className="habit-grid-header">
           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
             <div key={day} className="habit-grid-header-item">
               {day}
             </div>
           ))}
         </div>
   
         <div className="habit-grid">
           {days.map((day, index) => (
             <div
               key={index}
               className={`habit-day ${
                 day ? (isToday(day) ? "today" : "") : "empty"
               } ${
                 day && dailyValues[format(day, "yyyy-MM-dd")] ? "filled" : ""
               }`}
               style={{
                 border: day && isSameDay(day, currentDate) ? "2px solid #1976D2" : "1px solid #BBDEFB",
               }}
               onClick={() => day && setCurrentDate(day)}
             >
               {day ? <div>{format(day, "d")}</div> : null}
             </div>
           ))}
         </div>
   
         {/* Input for a custom value
         {isToday(currentDate) && (
           <div className="habit-input-container">
             <input
               className="habit-input"
               value={value}
               onChange={handleValueChange}
               placeholder="Add value for today"
             />
             <button
               className="habit-button"
               onClick={() => handleSave(currentDate)}
             >
               Save
             </button>
           </div>
         )} */}
   
         {/* Button to add calories for the selected day */}
         {totalCalories > 0 && (
           <button
             className="habit-button"
             onClick={() => handleAddCalories(currentDate)}
           >
             {format(currentDate, "MMMM d, yyyy")} - {totalCalories} 
           </button>
         )}
   
         {/* Display saved values
         {dailyValues[format(currentDate, "yyyy-MM-dd")] && (
           <div className="habit-value">
             <p>Value for {format(currentDate, "MMMM d, yyyy")}:</p>
             <div>{dailyValues[format(currentDate, "yyyy-MM-dd")]}</div>
           </div>
         )} */}
       </div>
     );
   };

export default CoolCalendar;
