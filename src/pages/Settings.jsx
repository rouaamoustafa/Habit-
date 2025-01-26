import { useState, React,useEffect } from 'react';
import Lottie from "lottie-react";
import alarmAnimation from "../assets/lottie.json";

const Settings = ({ direction,setDirection }) => {
  const toggleDirection = () => {
    setDirection((prevDirection) => (prevDirection === 'ltr' ? 'rtl' : 'ltr'));
  };

  const [alarmTime, setAlarmTime] = useState(""); 
  const [showAlarm, setShowAlarm] = useState(false); 

  useEffect(() => {
    // Check the current time every second
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, 
      });

      if (currentTime === alarmTime) {
        setShowAlarm(true);
      }
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [alarmTime]);

  const handleCloseAlarm = () => {
    setShowAlarm(false); // Close the alarm modal
    setAlarmTime(""); // Reset alarm time if desired
  };


  return (
    <div className="main-grid-settings">
    <button  className='boutton' onClick={toggleDirection}>
    {direction === 'ltr' ? 'Arabic' : 'إنكليزي'}
    </button>
    <div className="alarm-container">
      <h3>{direction === 'ltr' ? 'Set Alarm ' : 'ضبط المنبه'}</h3>
      <input
        type="time"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
      />
      {/* <button className='boutton' onClick={() => setShowAlarm(false)}>{direction === 'ltr' ? 'Set Alarm ' : 'ضبط المنبه'}</button> */}

      {showAlarm && (
        <div className="alarm-modal">
          <div className="alarm-content">
            <Lottie animationData={alarmAnimation} loop={true} />
            <p>{direction === 'ltr' ? ' Your alarm time has been reached! ' : "لقد حان وقت المنبه!"}</p>
            <button className='boutton' onClick={handleCloseAlarm}>{direction === 'ltr' ? ' Cancel ' : ' إلغاء'}</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Settings;
