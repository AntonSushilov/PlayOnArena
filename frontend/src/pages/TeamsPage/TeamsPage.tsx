import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Spin, Avatar, Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { loginUser } from "../../services/User/action";
import styles from "./TeamsPage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { getTeams } from "../../services/Team/action";
import { useAppSelector } from "../../hooks/UseAppSelector";
// import { useRootSelector } from "../../hooks/UseRootSelector";
// import { useAppDispatch } from "../../hooks/UseAppDispatch";
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
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
          <Card style={{margin: "20px 0 20px 0"}}>
            <div className={styles.content__teams}>
              {teams &&
                t.map((team: any, key: number) => (
                  <Card
                    key={key}
                    // title={team.title}
                    hoverable
                    // style={{ width: 240 }}
                    bordered={true}
                  >
                    <div className={styles.card__content}>
                      <Avatar size={128} icon={<UserOutlined />} />
                      <Typography>
                        <Title level={3}>{team.title}</Title>
                        <Paragraph style={{display: "flex", flexDirection: "row", gap: 12, justifyContent: "center"}}>
                          <Text type="secondary">Москва</Text>
                          <Text type="secondary">Россия</Text>
                        </Paragraph>
                      </Typography>
                    </div>
                  </Card>
                ))}
            </div>
          </Card>
        </Spin>
      </div>
    </div>
  );
};

export default TeamsPage;
