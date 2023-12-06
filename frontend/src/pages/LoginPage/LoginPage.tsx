import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";

const LoginPage = (): JSX.Element => {
  const handleLoginUser = () => {
    console.log("handleLoginUser")
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.login_form} onSubmit={handleLoginUser}>
          <p className="text text_type_main-medium">Вход</p>
        </form>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?{" "}
            <Link to="/register">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
