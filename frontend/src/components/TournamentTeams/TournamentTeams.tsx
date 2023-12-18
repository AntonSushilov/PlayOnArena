import { Spin, Avatar, Card, Typography, Form, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import TeamParticipantCard from "../TeamParticipantCard/TeamParticipantCard";
import styles from "./TournamentTeams.module.css";
import TeamCard from "../TeamCard/TeamCard";
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

const TournamentTeams = ({ teams }: any) => {
  const p = [{}, {}, {}, {}, {}, {}, {}];
  return (
    <section>
      <div className={styles.section__teams}>
        {teams &&
          teams.map((team: any, key: number) => <TeamCard key={key} team={team} />)}
      </div>
    </section>
  );
};

export default TournamentTeams;
