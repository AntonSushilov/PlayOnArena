import React, { Component } from "react";
import { NavLink, useMatch } from "react-router-dom";
import NavItem from "./NavItem/NavItem";
import classNames from "classnames";

import { useState } from "react";
// import Navbar from "./Navbar";

import styles from "./AppHeader.module.css";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
import { Button } from "antd";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { logoutUser } from "../../services/User/action";

export const AppHeader = () => {
  const isHome = !!useMatch({ path: "/" });
  const isFeed = !!useMatch("/feed");
  const isProfile = !!useMatch("/profile/*");
  const dispatch = useAppDispatch()
  const [active, setActive] = React.useState("home");
  const { user } = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
    }),
    // @ts-ignore
    shallowEqual
  );
  const handleLogout = () => {
    dispatch(logoutUser())
  }

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
        </section>

        <section className={classNames(styles.navbar, styles["topBotomBordersOut"])}>
          {user ? (
            <>
              <NavItem route_to="/profile">Личный кабинет</NavItem>
              {/* <NavItem route_to="/logout">Выход</NavItem> */}
              <Button type="primary" onClick={handleLogout}>
                Выход
              </Button>
              
            </>
          ) : (
            <>
              <NavItem route_to="/register">Регистрация</NavItem>
              <NavItem route_to="/login">Вход</NavItem>
            </>
          )}
        </section>
      </nav>
    </header>
  );
};

export default AppHeader;
