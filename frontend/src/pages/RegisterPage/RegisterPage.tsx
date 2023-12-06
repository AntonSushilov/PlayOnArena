import { Link } from "react-router-dom";
import styles from "./RegisterPage.module.css";

const RegisterPage = (): JSX.Element => {
  const handleRegisterUser = () => {
    console.log("handleRegisterUser")
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.login_form} onSubmit={handleRegisterUser}>
          <p className="">Регистрация</p>
          
        </form>
        <div className={styles.links}>
          <p className="">
            Уже зарегистрированы? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
