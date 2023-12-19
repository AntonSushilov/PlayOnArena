import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Spin, Card, Typography } from "antd";
import styles from "./TeamsPage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { getTeams } from "../../services/Team/action";
import { useAppSelector } from "../../hooks/UseAppSelector";
import TeamCard from "../../components/TeamCard/TeamCard";

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
  const t = [...teams, ...teams, ...teams, ...teams]
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spin
          className={styles.spin}
          spinning={getTeamsRequest}
          tip="Загрузка"
          size="large"
        >
          <Card style={{ margin: "20px 0 20px 0" }}>
            <div className={styles.content__teams}>
              {teams &&
                t.map((team: any, key: number) => <TeamCard key={key} team={team}/>)}
            </div>
          </Card>
        </Spin>
      </div>
    </div>
  );
};

export default TeamsPage;
