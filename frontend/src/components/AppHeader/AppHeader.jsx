import React, { Component } from "react";
import { NavLink, useMatch } from "react-router-dom";
import NavItem from "./NavItem/NavItem";
import classNames from "classnames";

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
        <section className={styles.logo}>
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
        <section
          className={classNames(styles.navbar, styles["topBotomBordersOut"])}
        >
          <NavItem route_to="/tournaments">Турниры</NavItem>
          <NavItem route_to="/teams">Команды</NavItem>
          <NavItem route_to="/register">Регистрация</NavItem>
          <NavItem route_to="/login">Вход</NavItem>
        </section>

        <section>
          <NavItem route_to="/profile">Личный кабинет</NavItem>
          
        </section>
      </nav>
    </header>
  );
};

export default AppHeader;
