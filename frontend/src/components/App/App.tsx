import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../../logo.svg";
import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import TournamentsPage from "../../pages/TournamentsPage/TournamentsPage";
import TeamsPage from "../../pages/TeamsPage/TeamsPage";
import HomePage from "../../pages/HomePage/HomePage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

const App = (): JSX.Element => {
  let location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default App;
