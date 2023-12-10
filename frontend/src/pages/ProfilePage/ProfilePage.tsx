import { useState } from "react";
import { Avatar, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./ProfilePage.module.css";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
const { Title, Paragraph, Text, Link } = Typography;
const ProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  // const navigate = useNavigate();
  const { user }: any = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
    }),
    // @ts-ignore
    shallowEqual
  );
  const [viewEditProfileForm, setViewEditProfileForm] = useState(false);
  const buttonClick = () => {
    console.log("tyt");
    setViewEditProfileForm(!viewEditProfileForm);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.profile_info}>
          <Avatar size={256} icon={<UserOutlined />} />
          {!viewEditProfileForm && (
            <Typography>
              <Title>{user.first_name} {user.last_name}</Title>

              <Button type="primary" shape="round" onClick={buttonClick}>
                Изменить профиль
              </Button>
            </Typography>
          )}
          {viewEditProfileForm && (
            <EditProfileForm viewEditForm={buttonClick} />
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
    </div>
  );
};

export default ProfilePage;
