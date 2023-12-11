import { useState } from "react";
import { Avatar, Typography, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./ProfilePage.module.css";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
const { Title, Paragraph, Text, Link } = Typography;
const ProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const { user }: any = useAppSelector(
  //   (store) => ({
  //     user: store.userReducer.user,
  //   }),
  //   // @ts-ignore
  //   shallowEqual
  // );
  const [viewEditProfileForm, setViewEditProfileForm] = useState(false);
  const buttonClick = () => {
    console.log("tyt");
    setViewEditProfileForm(!viewEditProfileForm);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.profile__info}>
          <Card>
            <div className={styles.profile__info__content}>
              <Avatar size={256} icon={<UserOutlined />} />
              {!viewEditProfileForm ? (
                <>
                  <Title level={2}>Иванов Иван Иванович</Title>
                  <Paragraph>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Sequi nulla dolorum, nesciunt excepturi alias necessitatibus
                    impedit, deleniti libero in reiciendis ab. Vero, eum tempora
                    nostrum dicta unde ab quod veritatis.
                  </Paragraph>
                  <Button type="primary" shape="round" onClick={buttonClick}>
                    Изменить профиль
                  </Button>
                </>
              ) : (
                <EditProfileForm viewEditForm={buttonClick} />
              )}
            </div>
          </Card>
        </div>
        <div className={styles.profile__main}>
          <Card>
            <div className={styles.profile__main__content}>
              <Button type="primary">Создать команду</Button>
              <Button type="primary">Создать турнир</Button>
              <Card type="inner">
                <Title level={2}>Команды:</Title>
                <div>Список команд в которых участвует пользователь</div>
              </Card>
              <Card type="inner">
                <Title level={2}>Турниры:</Title>
                <div>Список турниров в которых участвует пользователь</div>

              </Card>
            </div>
          </Card>
        </div>
      </div>
      {/* <Card className={styles.card_profile} bodyStyle={{height: "100%"}}>
        
        <div className={styles.content}>
          <div className={styles.profile_info}>
            <Avatar size={256} icon={<UserOutlined />} />
            {!viewEditProfileForm && (
              <Typography>
                <Title>Иванов Иван Иванович</Title>

                <Button type="primary" shape="round" onClick={buttonClick}>
                  Изменить профиль
                </Button>
              </Typography>
            )}
            {viewEditProfileForm && (
            )}
          </div>
          <div className={styles.profile__admin_panel}>
            <Typography>
              <section className={styles.admin_panel__control}></section>
              <section className={styles.admin_panel__tournament}>
                <Title>Турниры:</Title>
              </section>
              <section className={styles.admin_panel__teams}>
                <Title>Команды:</Title>
              </section>
            </Typography>
          </div>
        </div>
      </Card> */}
    </div>
  );
};

export default ProfilePage;
