import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Spin, Avatar, Card, Typography, Form, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { loginUser } from "../../services/User/action";
import styles from "./TournamentDetailsPage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { clearDetailTeam, getDetailTeam, getTeams } from "../../services/Team/action";
import EditTeamForm from "../../components/EditTeamForm/EditTeamForm";
import { clearDetailTournament, getDetailTournament } from "../../services/Tournament/action";
import TeamParticipants from "../../components/TeamParticipants/TeamParticipants";
import TournamentTeams from "../../components/TournamentTeams/TournamentTeams";
import TournamentGrid from "../../components/TournamentGrid/TournamentGrid";
import TournamentMatches from "../../components/TournamentMatches/TournamentMatches";
// import TeamParticipants from "../../components/TeamParticipants/TeamParticipants";

// import { useRootSelector } from "../../hooks/UseRootSelector";
// import { useAppDispatch } from "../../hooks/UseAppDispatch";
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
const TournamentDetailsPage = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { getTournamentRequest, detailTournament, teams, getTeamsRequest }: any = useAppSelector(
    (store) => ({
      getTournamentRequest: store.tournamentReducer.getTournamentRequest,
      detailTournament: store.tournamentReducer.detailTournament,
      teams: store.teamReducer.teams,
      getTeamsRequest: store.teamReducer.getTeamsRequest,
    }),
    // @ts-ignore
    shallowEqual
  );
  console.log(detailTournament);
  const start_date = new Date(detailTournament?.start_date).toLocaleDateString()
  const end_date = new Date(detailTournament?.end_date).toLocaleDateString()
  useEffect(() => {
    dispatch(getDetailTournament(id));
    dispatch(getTeams());

    return () => {
      dispatch(clearDetailTournament());
    };
  }, []);
  const [viewEditTeamForm, setViewEditTeamForm] = useState(false);
  const buttonClick = () => {
    setViewEditTeamForm(!viewEditTeamForm);
  };
  const [form] = Form.useForm();
  const [activeTabKey, setActiveTabKey] = useState<string>("teams");
  const tabList = [
    {
      key: "teams",
      label: "Команды",
    },
    {
      key: "tournament_grid",
      label: "Турнирная сетка",
    },
    {
      key: "schedule",
      label: "Расписание",
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    teams: <TournamentTeams teams={teams} />,
    tournament_grid: <TournamentGrid teams={teams}/>,
    schedule: <TournamentMatches />,
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spin
          className={styles.spin}
          spinning={getTournamentRequest}
          tip="Загрузка"
          size="large"
        >
          {detailTournament && (
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
                          src={detailTournament?.photo}
                          style={{ objectFit: "contain" }}
                        ></img>
                      }
                    />
                    {!viewEditTeamForm ? (
                      <>
                        <Title level={2}>{detailTournament.title}</Title>
                        <Paragraph
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12,
                            justifyContent: "center",
                          }}
                        >
                          <Text type="secondary">{start_date}</Text>
                          -
                          <Text type="secondary">{end_date}</Text>
                        </Paragraph>
                        <Paragraph
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12,
                            justifyContent: "center",
                          }}
                        >
                          <Text type="secondary">{detailTournament.country}</Text>
                          <Text type="secondary">{detailTournament.city}</Text>
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
                            Вид спорта: {detailTournament.sport_type}
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
                            Максимальное количество команд: {detailTournament?.count_teams}
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
                            Система расписания: {detailTournament?.schedule_system_type}
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
                            Тип турнира: {detailTournament?.tournament_type}
                          </Text>
                        </Paragraph>
                        <Paragraph>{detailTournament.description}</Paragraph>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={buttonClick}
                        >
                          Изменить турнир
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

export default TournamentDetailsPage;
