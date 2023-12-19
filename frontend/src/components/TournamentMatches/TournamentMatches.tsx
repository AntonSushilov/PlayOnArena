import { Spin, Avatar, Card, Typography, Form, Button, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import TeamParticipantCard from "../TeamParticipantCard/TeamParticipantCard";
import styles from "./TournamentMatches.module.css";
import TeamCard from "../TeamCard/TeamCard";
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

const TournamentMatches = ({teams, matches}: any) => {

  // const rounds_matches = matches.reduce((a: any, c:any) => {
  //   let idx = a.findIndex((e: any) => e[0].round === c.round);
  //   if (idx !== -1) a[idx].push(c);
  //   else a.push([c]);
  //   return a;
  // }, [])
  const rounds: any = useMemo(
    () => Array.from(new Set(matches?.map((el: any) => el.round))),
    [matches]
  );
  console.log(matches)
  return (
    <section>
      <div className={styles.section__matches}>
      {matches &&
          rounds &&
          rounds?.map((r: any, key: number) => {
            const r_matches = matches.filter((el: any) => el.round == r);
            return (
              <List
                header={<Title level={4}>{`Раунд ${r}`}</Title>}
                style={{ width: "100%" }}
                itemLayout="horizontal"
                dataSource={r_matches}
                bordered
                renderItem={(item: any, index) => {
                  const owner = teams.find(
                    (team: any) => team.id == item.owner
                  );
                  const guest = teams.find(
                    (team: any) => team.id == item.guest
                  );
                  return (
                    <List.Item style={{ gap: "24px" }}>
                      {/* <Card
                        style={{ width: "100%", height: "70px" }}
                        type="inner"
                      > */}
                      <div className={styles.card__match}>
                        <div></div>
                        {/* <div className={styles.match__team}>
                          
                          <DatePicker picker={"date"} onChange={onChange} />
                          <DatePicker picker={"time"} onChange={onChange} />
                        </div> */}
                        <div className={styles.match__team}>
                          <Avatar src={owner.logo} />
                          <Text>{owner.title}</Text>
                        </div>
                        <Text
                          style={{ textAlign: "center", alignItems: "center" }}
                        >
                          VS
                        </Text>
                        <div className={styles.match__team}>
                          <Avatar src={guest.logo} />
                          <Text
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {guest.title}
                          </Text>
                        </div>
                      </div>
                      {/* </Card> */}
                      {/* <div>
                        {item.datetime}
                      </div>
                      <List.Item.Meta
                        avatar={<Avatar src={owner.logo} size={"large"}/>}
                        title={owner.title}
                      />
                      <List.Item.Meta
                        title={ <Title level={3}>VS</Title>}
                      />
                      <List.Item.Meta
                        avatar={<Avatar src={owner.logo} size={"large"}/>}
                        title={guest.title}
                      /> */}
                    </List.Item>
                  );
                }}
              />
            );
          })}

        {/* {rounds_matches && rounds_matches.map((round: any, key: number)=>{
          return <Card title={`Раунд ${key+1}`}>
            <Typography>
            {round && round.map((match:any, key2:number)=>{
              const owner = teams.find((el:any)=> Number(el.id) == Number(match.owner))
              const guest = teams.find((el:any)=> Number(el.id) == Number(match.guest))
              return <Title level={3}>{owner?.title} vs {guest?.title}</Title>
            })}
            </Typography>
            
          </Card>
        })} */}
      </div>
    </section>
  );
};

export default TournamentMatches;
