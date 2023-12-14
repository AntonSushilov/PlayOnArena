import React, { useState } from "react";
import { Avatar, Typography, Button, Card, Modal, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./ProfilePage.module.css";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
import CreateTeamForm from "../../components/CreateTeamForm/CreateTeamForm";
import CreateTournamentForm from "../../components/CreateTournamentForm/CreateTeamForm";
const { Title, Paragraph, Text, Link } = Typography;
const ProfilePage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState<string | null>(null);
  const showModal = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    type: string
  ) => {
    setIsModalOpen(true);
    setTypeModal(type);
  };
  const handleOk = (values: any) => {
    switch (typeModal) {
      case "createTeam":
        console.log("createTeam");
        break;
      case "createTournament":
        console.log("createTournament");
        break;
      default:
        break;
    }
    values.ban_dates = values?.ban_dates?.map((x: any) => {
      return x.toDate().toLocaleDateString();
    });
    console.log(values);
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setTypeModal(null);
  };

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
  const [form] = Form.useForm();

  const titleModal = () => {
    switch (typeModal) {
      case "createTeam":
        return "Создание команды";
      case "createTournament":
        return "Создание турнира";
      default:
        return "Заголовок";
    }
  };

  const contentModal = () => {
    switch (typeModal) {
      case "createTeam":
        return <CreateTeamForm form={form} />;
      case "createTournament":
        return <CreateTournamentForm form={form} />;
      default:
        return "Заголовок";
    }
  };

  return (
    <>
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
                      Sequi nulla dolorum, nesciunt excepturi alias
                      necessitatibus impedit, deleniti libero in reiciendis ab.
                      Vero, eum tempora nostrum dicta unde ab quod veritatis.
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
                <Button
                  type="primary"
                  onClick={(e) => showModal(e, "createTeam")}
                >
                  Создать команду
                </Button>
                <Button
                  type="primary"
                  onClick={(e) => showModal(e, "createTournament")}
                >
                  Создать турнир
                </Button>
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
      </div>
      <Modal
        title={titleModal()}
        okText="Создать"
        cancelText="Закрыть"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleOk(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        style={{ top: 120 }}
        width="fit-content"
        destroyOnClose={true}
      >
        {contentModal()}
      </Modal>
    </>
  );
};

export default ProfilePage;
