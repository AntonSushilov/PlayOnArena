import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Spin, Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { loginUser } from "../../services/User/action";
import styles from "./TeamsPage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { getTeams } from "../../services/Team/action";
import { useAppSelector } from "../../hooks/UseAppSelector";
// import { useRootSelector } from "../../hooks/UseRootSelector";
// import { useAppDispatch } from "../../hooks/UseAppDispatch";
const { Meta } = Card;

const TeamsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const { teams, getTeamsRequest }: any = useAppSelector(
    (store) => ({
      teams: store.teamReducer.teams,
      getTeamsRequest: store.teamReducer.getTeamsRequest,
    }),
    // @ts-ignore
    shallowEqual
  );
  console.log("teams", teams);
  console.log("teams", getTeamsRequest);
  const t = [...teams, ...teams, ...teams, ...teams];
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spin
          className={styles.spin}
          spinning={getTeamsRequest}
          tip="Загрузка"
          size="large"
        >
          <div className={styles.content__teams}>
            {teams &&
              t.map((team: any, key: number) => (
                <Card
                  key={key}
                  title={team.title}
                  hoverable
                  // style={{ width: 240 }}
                  bordered={false}
                >
                  <div className={styles.card__content}>
                    <Avatar size={128} icon={<UserOutlined />} />
                    <div className={styles.content__participants}>
                      {team.participants &&
                        team.participants.map(
                          (participant: any, key2: number) => {
                            return (
                              <>
                                <Avatar
                                  key={key2}
                                  size={64}
                                  icon={<UserOutlined />}
                                />
                                {participant.fio}
                              </>
                            );
                          }
                        )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default TeamsPage;
