import { Navigate, useLocation } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { useAppSelector } from "../../hooks/UseAppSelector";

type TProtectedRoute = {
  component: JSX.Element | null,
  onlyUnAuth?: boolean
}

const ProtectedRoute = ({ onlyUnAuth = false, component }: TProtectedRoute) => {
  const { isAuthChecked, user }: any = useAppSelector(
    (store) => ({
      isAuthChecked: store.userReducer.isAuthChecked,
      user: store.userReducer.user,
    }),
    // @ts-ignore
    shallowEqual
  );
  const location = useLocation();
  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null; // или прелоадер
  }
  if (onlyUnAuth && user) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} state={location.state} replace/>;
  }
  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user

  return component;
};


type TOnlyUnAuth = {
  component: JSX.Element | null,
}
export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: TOnlyUnAuth): JSX.Element => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
