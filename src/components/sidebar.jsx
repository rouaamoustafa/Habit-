import React from "react";
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
    
    {
      path: "/habit",
      name: t.habit,
      icon: <Clipboard2Data />,
    },
    {
      path: "/settings",
      name: t.settings,
      icon: <Gear />,//habit
    },
  ];

  return (
    <div className="container">
      <div style={{width:isOpenSidebar ? "10vw" : "4vw" }}className="sidebar">
        {/* <div className="top_section">
          <h1 style={{display:isOpen ? "block" : "none" }} className="logo">Logo</h1>
          <div className="bars">
            <MenuButtonWide onClick={toggle}/>
          </div>
        </div> */}
        <div className="menu">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="menu-link"
              activeClassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div style={{display:isOpenSidebar ? "block" : "none" }}className="text">{item.name}</div>
            </NavLink>
          ))}
        </div>
        {/* Add Sticky Note button */}
        <div className="menu-link" activeClassName="active" onClick={addNote}>
          <div className="icon"><Sticky/></div>
          <div style={{display:isOpenSidebar ? "block" : "none" }}className="text">{t.addNote}</div>
        </div>
      </div>
      <main
       style={{ width: isOpenSidebar ? "90vw" : "96vw"}}
      >{children}</main>
    </div>
  );
};

export default Sidebar;
