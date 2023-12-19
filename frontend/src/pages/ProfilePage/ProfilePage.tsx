import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button, Card, Modal, Form, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./ProfilePage.module.css";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
import CreateTeamForm from "../../components/CreateTeamForm/CreateTeamForm";
import CreateTournamentForm from "../../components/CreateTournamentForm/CreateTournamentForm";
import { getUserProfile } from "../../services/User/action";
import TournamentCard from "../../components/TournamentCard/TournamentCard";
import TeamCard from "../../components/TeamCard/TeamCard";
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
    // values.ban_dates = values?.ban_dates?.map((x: any) => {
    //   return x.toDate().toLocaleDateString();
    // });
    values.start_date = values?.start_date.toDate().toLocaleDateString();
    values.end_date = values?.end_date.toDate().toLocaleDateString();

    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setTypeModal(null);
  };
  const { user, userProfile, userProfileRequest }: any = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
      userProfile: store.userReducer.userProfile,
      userProfileRequest: store.userReducer.userProfileRequest,
    }),
    // @ts-ignore
    shallowEqual
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  const [userProfileDetail, setUserProfileDetail] = useState<any>(null);
  useEffect(() => {
    if (userProfile) {
      setUserProfileDetail(userProfile[0]);
    }
  }, [userProfile]);
  // console.log(user, userProfile[0]);
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
              <Spin
                className={styles.spin}
                spinning={userProfileRequest}
                tip="Загрузка"
                size="large"
              >
                {userProfileDetail && (
                  <div className={styles.profile__info__content}>
                    <Avatar
                      size={256}
                      icon={
                        userProfileDetail.photo ? (
                          <img
                            src={userProfileDetail.photo}
                            style={{ objectFit: "contain" }}
                          ></img>
                        ) : (
                          <UserOutlined />
                        )
                      }
                    />
                    {!viewEditProfileForm ? (
                      <>
                        <Title level={2}>
                          {userProfileDetail.first_name}{" "}
                          {userProfileDetail.middle_name}{" "}
                          {userProfileDetail.last_name}
                        </Title>
                        <Text>
                          {userProfileDetail?.email
                            ? userProfileDetail.email
                            : "Email не указан"}
                        </Text>
                        <Paragraph>
                          {userProfileDetail?.bio
                            ? userProfileDetail.bio
                            : "Биография не заполнена"}
                        </Paragraph>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={buttonClick}
                        >
                          Изменить профиль
                        </Button>
                      </>
                    ) : (
                      <EditProfileForm viewEditForm={buttonClick} />
                    )}
                  </div>
                )}
              </Spin>
            </Card>
          </div>
          <div className={styles.profile__main}>
            <Card>
              <Spin
                className={styles.spin}
                spinning={userProfileRequest}
                tip="Загрузка"
                size="large"
              >
                {userProfileDetail && (
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
                    <Card type="inner" >
                      <Title level={2}>Команды:</Title>
                      <div className={styles.content__tournaments}>
                        {userProfileDetail.created_teams &&
                          userProfileDetail.created_teams.map(
                            (team: any, key: number) => (
                              <TeamCard key={key} team={team}/>
                            )
                          )}
                      </div>
                    </Card>
                    <Card type="inner">
                      <Title level={2}>Турниры:</Title>
                      <div className={styles.content__tournaments}>
                        {userProfileDetail.tournaments &&
                          userProfileDetail.tournaments.map(
                            (tournament: any, key: number) => (
                              <TournamentCard
                                key={key}
                                tournament={tournament}
                              />
                            )
                          )}
                      </div>
                    </Card>
                  </div>
                )}
              </Spin>
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
