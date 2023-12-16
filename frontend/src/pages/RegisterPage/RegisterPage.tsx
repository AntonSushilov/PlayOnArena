import { Link } from "react-router-dom";
import { Form, Button, Card, Input, Typography, message } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import styles from "./RegisterPage.module.css";

import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
import { registerUser } from "../../services/User/action";
import { useEffect } from "react";
const { Title, Paragraph, Text } = Typography;

const RegisterPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, userFailed, userRegisterSuccess, errorMessage }: any =
    useAppSelector(
      (store) => ({
        user: store.userReducer.user,
        userFailed: store.userReducer.userFailed,
        userRegisterSuccess: store.userReducer.userRegisterSuccess,
        errorMessage: store.userReducer.message,
      }),
      // @ts-ignore
      shallowEqual
    );
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (userRegisterSuccess) {
      navigate("/login");
    }
  }, [userRegisterSuccess]);
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

  const handleRegisterUser = (values: any) => {
    dispatch(registerUser(values.login, values.password));
    // console.log("userRegisterSuccess", userFailed)
    // if (userFailed) {
    //   messageApi.open({
    //     type: "success",
    //     content: "Вы успешно зарегистрировались, войдите в вашу учетную запись",
    //     style: {
    //       // marginTop: "100px",
    //     },
    //   });
    //   navigate("/login");
    // } else {
    //   Object.keys(errorMessage).map((el) => {
    //     messageApi.open({
    //       type: "error",
    //       content: errorMessage[el],
    //       style: {
    //         // marginTop: "100px",
    //       },
    //     });
    //   });
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {contextHolder}

        <Card
          title={<Title style={{ textAlign: "center" }}>Регистрация</Title>}
        >
          {/* <Typography>
          <Title>Регистрация</Title>
        </Typography> */}
          <Form
            name="loginForm"
            // autoComplete="on"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            style={{ width: 500 }}
            onFinish={(values) => {
              handleRegisterUser(values);
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
            <Form.Item
              name="confirmPassword"
              label="Подтверждение пароля"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Пожалуйста повторите пароль",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Пароли не совпадают");
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Повторите ваш пароль"
                autoComplete="on"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button block type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <div className={styles.links}>
          <p className="">
            Уже зарегистрированы?{" "}
            <Link className={styles.link} to="/login">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
