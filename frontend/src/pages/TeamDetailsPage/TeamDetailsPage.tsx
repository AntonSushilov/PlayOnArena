import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Spin, Avatar, Card, Typography, Form, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { loginUser } from "../../services/User/action";
import styles from "./TeamDetailsPage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { clearDetailTeam, getDetailTeam } from "../../services/Team/action";
import EditTeamForm from "../../components/EditTeamForm/EditTeamForm";
import TeamParticipants from "../../components/TeamParticipants/TeamParticipants";

// import { useRootSelector } from "../../hooks/UseRootSelector";
// import { useAppDispatch } from "../../hooks/UseAppDispatch";
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
const TeamDetailsPage = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { getTeamRequest, detailTeam }: any = useAppSelector(
    (store) => ({
      getTeamRequest: store.teamReducer.getTeamRequest,
      detailTeam: store.teamReducer.detailTeam,
    }),
    // @ts-ignore
    shallowEqual
  );
  console.log(detailTeam);
  useEffect(() => {
    dispatch(getDetailTeam(id));
    return () => {
      dispatch(clearDetailTeam());
    };
  }, []);
  const [viewEditTeamForm, setViewEditTeamForm] = useState(false);
  const buttonClick = () => {
    setViewEditTeamForm(!viewEditTeamForm);
  };
  const [form] = Form.useForm();
  const [activeTabKey, setActiveTabKey] = useState<string>("composition");
  const tabList = [
    {
      key: "composition",
      label: "Состав",
    },
    {
      key: "tournaments",
      label: "Турниры",
    },
    {
      key: "matches",
      label: "Матчи",
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    composition: <TeamParticipants participants={[]} />,
    tournaments: <p>В разработке</p>,
    matches: <p>В разработке</p>,
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spin
          className={styles.spin}
          spinning={getTeamRequest}
          tip="Загрузка"
          size="large"
        >
          {detailTeam && (
            <div className={styles.content__team}>
              <div className={styles.team__info}>
                <Card>
                  <div className={styles.team__info__content}>
                    <Avatar
                      size={256}
                      shape="square"
                      style={{
                        backgroundColor: "white",
                        verticalAlign: "middle",
                      }}
                      icon={
                        <img
                          src={detailTeam?.logo}
                          style={{ objectFit: "contain" }}
                        ></img>
                      }
                    />
                    {!viewEditTeamForm ? (
                      <>
                        <Title level={2}>{detailTeam.title}</Title>
                        <Paragraph
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12,
                            justifyContent: "center",
                          }}
                        >
                          <Text type="secondary">{detailTeam.country}</Text>
                          <Text type="secondary">{detailTeam.city}</Text>
                        </Paragraph>
                        <Paragraph
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12,
                            justifyContent: "center",
                          }}
                        >
                          <Text type="secondary">
                            Вид спорта: {detailTeam.sport_type}
                          </Text>
                        </Paragraph>
                        <Paragraph
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12,
                            justifyContent: "center",
                          }}
                        >
                          <Text type="secondary">
                            Рейтинг: {detailTeam.rating}
                          </Text>
                        </Paragraph>

                        <Paragraph>{detailTeam.description}</Paragraph>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={buttonClick}
                        >
                          Изменить профиль
                        </Button>
                      </>
                    ) : (
                      <EditTeamForm viewEditForm={buttonClick} />
                    )}
                  </div>
                </Card>
              </div>
              <div className={styles.team__main}>
                <Card
                  tabList={tabList}
                  activeTabKey={activeTabKey}
                  onTabChange={onTabChange}
                >
                  {contentList[activeTabKey]}
                </Card>
              </div>
            </div>
          )}
          {/* <Card style={{ margin: "20px 0 20px 0" }}>
            {detailTeam && (
              <div className={styles.card__content}>
                <section className={styles.section__avatar}>
                  <Avatar
                    size={256}
                    shape="square"
                    style={{
                      backgroundColor: "white",
                      verticalAlign: "middle",
                    }}
                    icon={
                      <img
                        src={detailTeam?.logo}
                        style={{ objectFit: "contain" }}
                      ></img>
                    }
                  />
                </section>
                <section className={styles.section__}></section>
              </div>
            )}
          </Card> */}
        </Spin>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
