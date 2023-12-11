import { Link } from "react-router-dom";
import { Form, Button, Card, Input, Typography } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import styles from "./RegisterPage.module.css";

import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
import { registerUser } from "../../services/User/action";
const { Title, Paragraph, Text } = Typography;

const RegisterPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { user }: any = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
    }),
    // @ts-ignore
    shallowEqual
  );
  
  const handleRegisterUser = async (values: any) => {
    await dispatch(registerUser(values.login, values.password))
    
    navigate('/login');
  };


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Card title={<Title style={{textAlign: "center"}}>Регистрация</Title>}>
        {/* <Typography>
          <Title>Регистрация</Title>
        </Typography> */}
        <Form
          name="loginForm"
          autoComplete="off"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 15 }}
          style={{ width: 500 }}
          onFinish={(values) => {
            handleRegisterUser(values)
            console.log({ values });
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
                  return Promise.reject("Пароли не совпадают")
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Повторите ваш пароль" />
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
            Уже зарегистрированы? <Link className={styles.link} to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
