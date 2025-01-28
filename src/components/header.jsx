import React from "react";
import Calendar from "../components/calendar"
import "../style/header.css";
import { MenuButtonWide } from "react-bootstrap-icons";
 const Header = ({toggleSideBar,direction, translations}) =>{
    return (
        <div className="header">
            <div className="bars" onClick={toggleSideBar}>
              <MenuButtonWide />
            </div>
           <div className="top_section">
            {/* <h1 style={{display:isOpen ? "block" : "none" }} className="logo">Logo</h1> */}
            <div className="calendar-section">
            <Calendar direction={direction} translations={translations} />
             </div>
            
          </div>
          
        </div>
    );
 };
export default Header; 