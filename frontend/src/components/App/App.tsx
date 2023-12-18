import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../../logo.svg";
import styles from "./App.module.css";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import AppHeader from "../AppHeader/AppHeader";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import TournamentsPage from "../../pages/TournamentsPage/TournamentsPage";
import TeamsPage from "../../pages/TeamsPage/TeamsPage";
import HomePage from "../../pages/HomePage/HomePage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import TeamDetailsPage from "../../pages/TeamDetailsPage/TeamDetailsPage";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { checkUserAuth } from "../../services/User/action";
import TournamentDetailsPage from "../../pages/TournamentDetailsPage/TournamentDetailsPage";

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);
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
          <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:id" element={<TeamDetailsPage />} />
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />}/>
          <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default App;
