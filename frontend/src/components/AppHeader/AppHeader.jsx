import React, { Component } from "react";
import { NavLink, useMatch } from "react-router-dom";
import NavItem from "./NavItem/NavItem";

import { useState } from "react";
// import Navbar from "./Navbar";

import styles from "./AppHeader.module.css";

export const AppHeader = () => {
  const isHome = !!useMatch({ path: "/" });
  const isFeed = !!useMatch("/feed");
  const isProfile = !!useMatch("/profile/*");

  const [active, setActive] = React.useState("home");

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <section className={styles.section_left}>
          <NavLink
            to="/tournaments"
            className={({ isActive }) =>
              isActive ? "" : "text_color_inactive"
            }
          >
            <NavItem>
              <p className="text text_type_main-default ml-2">Турниры</p>
            </NavItem>
          </NavLink>
          <NavLink
            to="/teams"
            className={({ isActive }) =>
              isActive ? "" : "text_color_inactive"
            }
          >
            <NavItem>
              <p className="text text_type_main-default ml-2">Команды</p>
            </NavItem>
          </NavLink>
        </section>
        <section className={styles.section_center}>
          {/* <Logo /> */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "" : "text_color_inactive"
            }
          >
            PlayOnArena
          </NavLink>
          
        </section>
        <section className={styles.section_right}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "" : "text_color_inactive"
            }
          >
            <NavItem>
              <p className="">Личный кабинет</p>
            </NavItem>
          </NavLink>
        </section>
      </nav>
    </header>
  );
};

export default AppHeader;
