import React from "react";
import "../style/sidebar.css";
import { NavLink } from "react-router-dom";
import { Calendar2Month, CashCoin, Clipboard2Data, CupHot, Gear, Sticky } from "react-bootstrap-icons";

const Sidebar = ({ isOpenSidebar, direction, translations ,children ,addNote}) => {
  const t = translations[direction];
  console.log(children);
  const menuItem = [
    {
      path: "/",
      name: t.task,
      icon: <Calendar2Month />,
    },
    {
      path: "/calorie",
      name: t.health,
      icon: <CupHot />,
    },
    
    // {
    //   path: "/Habit",
    //   name: t.habit,
    //   icon: <Clipboard2Data />,
    // },
    {
      path: "/settings",
      name: t.settings,
      icon: <Gear />,//habit
    },
  ];

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${isOpenSidebar ? "open" : "collapsed"}`}>
        {/* Sidebar Menu */}
        <div className="menu">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="menu-link"
              activeClassName="active"
            >
              <div className="icon">{item.icon}</div>
              {isOpenSidebar && <div className="text">{item.name}</div>}
            </NavLink>
          ))}
        </div>
        {/* Add Sticky Note Button */}
        <div className="menu-link" onClick={addNote}>
          <div className="icon"><Sticky /></div>
          {isOpenSidebar && <div className="text">{t.addNote}</div>}
        </div>
      </div>
      
      {/* Main Content */}
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Sidebar;
