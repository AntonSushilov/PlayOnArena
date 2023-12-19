import { Spin, Avatar, Card, Typography, Form, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import TeamParticipantCard from "../TeamParticipantCard/TeamParticipantCard";
import styles from "./TournamentMatches.module.css";
import TeamCard from "../TeamCard/TeamCard";
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

const TournamentMatches = () => {
  const teamss = [
    { id: 1, title: "Team 1" },
    { id: 2, title: "Team 2" },
    { id: 3, title: "Team 3" },
    { id: 4, title: "Team 4" },
  ];
  const matches = [
    {
      datetime: null,
      guest: "3",
      guest_points: 3,
      owner: "1",
      owner_points: 1,
      round: 0,
    },
    {
      datetime: null,
      guest: "2",
      guest_points: 2,
      owner: "4",
      owner_points: 4,
      round: 0,
    },
    {
      datetime: null,
      guest: "2",
      guest_points: 2,
      owner: "1",
      owner_points: 1,
      round: 1,
    },
    {
      datetime: null,
      guest: "4",
      guest_points: 4,
      owner: "3",
      owner_points: 3,
      round: 1,
    },
    {
      datetime: null,
      guest: "4",
      guest_points: 4,
      owner: "1",
      owner_points: 1,
      round: 2,
    },
    {
      datetime: null,
      guest: "3",
      guest_points: 3,
      owner: "2",
      owner_points: 2,
      round: 2,
    },
  ];
  
  const rounds_matches = matches.reduce((a: any, c:any) => {
    let idx = a.findIndex((e: any) => e[0].round === c.round);
    if (idx !== -1) a[idx].push(c);
    else a.push([c]);
    return a;
  }, [])
  console.log(rounds_matches)
  return (
    <section>
      <div className={styles.section__matches}>
        {rounds_matches && rounds_matches.map((round: any, key: number)=>{
          return <Card title={`Раунд ${key+1}`}>
            <Typography>
            {round && round.map((match:any, key2:number)=>{
              const owner = teamss.find((el:any)=> Number(el.id) == Number(match.owner))
              const guest = teamss.find((el:any)=> Number(el.id) == Number(match.guest))
              return <Title level={3}>{owner?.title} vs {guest?.title}</Title>
            })}
            </Typography>
            
          </Card>
        })}
      </div>
    </section>
  );
};

export default TournamentMatches;
