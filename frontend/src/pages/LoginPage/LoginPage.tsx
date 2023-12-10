import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Checkbox, Input, Typography } from "antd";
import styles from "./LoginPage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { loginUser } from "../../services/User/action";
import { shallowEqual } from "react-redux";
const { Title, Paragraph, Text } = Typography;

const LoginPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { user }: any = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
    }),
    // @ts-ignore
    shallowEqual
  );
  const handleLoginUser = async (values: any) => {
    await dispatch(loginUser(values.login, values.password))

    navigate('/profile');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography>
          <Title>Вход</Title>
        </Typography>
        <Form
          name="loginForm"
          autoComplete="off"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 15 }}
          style={{ width: 500 }}
          onFinish={(values) => {
            handleLoginUser(values);
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
            name="login"
            label="Логин"
            rules={[
              {
                required: true,
                message: "Пожалуйста введите логин",
              },
              {
                whitespace: true,
                message: "Логин не может быть пустым",
              },
              {
                min: 5,
                message: "Логин должен быть больше 5 символов",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Придумайте логин" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: "Пожалуйста введите пароль",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Придумайте пароль" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Вход
            </Button>
          </Form.Item>
        </Form>
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
