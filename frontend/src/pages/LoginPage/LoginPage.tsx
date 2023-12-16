import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Card, Input, Typography, message } from "antd";
import styles from "./LoginPage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { checkUserAuth, getUser, loginUser } from "../../services/User/action";
import { shallowEqual } from "react-redux";
import { useEffect } from "react";
const { Title, Paragraph, Text } = Typography;

const LoginPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, userLoginSuccess, token, userFailed, errorMessage }: any = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
      userLoginSuccess: store.userReducer.userLoginSuccess,
      token: store.userReducer.token,
      userFailed: store.userReducer.userFailed,
      errorMessage: store.userReducer.message,
    }),
    // @ts-ignore
    // shallowEqual
  );
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (userLoginSuccess) {
      dispatch(checkUserAuth());
    }
  }, [userLoginSuccess]);

  useEffect(() => {
    if (userFailed) {
      console.log("userFailed", userFailed);
      Object.keys(errorMessage).map((el) => {
        messageApi.open({
          type: "error",
          content: errorMessage[el],
          style: {
            // marginTop: "100px",
          },
        });
      });
    }
  }, [userFailed]);

  const handleLoginUser = (values: any) => {
    dispatch(loginUser(values.login, values.password));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
      {contextHolder}
        <Card title={<Title style={{ textAlign: "center" }}>Вход</Title>}>
          <Form
            name="loginForm"
            autoComplete="on"
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
              <Input.Password
                placeholder="Придумайте пароль"
                autoComplete="on"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button block type="primary" htmlType="submit">
                Вход
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?{" "}
            <Link className={styles.link} to="/register">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
