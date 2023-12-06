import styles from "./Error.module.css";

const Error = (): JSX.Element => {
  return (
    <section className={styles.content}>
      <h1 className="text text_type_main-large mb-10">
        Что-то пошло не так :(
      </h1>
      <p className="text text_type_main-medium">
        В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
      </p>
    </section>
  );
};

export default Error;
