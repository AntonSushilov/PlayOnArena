import { Spin, Avatar, Card, Typography, Form, Button } from "antd";
import { UserOutlined } from '@ant-design/icons';
import React from "react";
import TeamParticipantCard from "../TeamParticipantCard/TeamParticipantCard";
import styles from './TeamParticipants.module.css'
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

const TeamParticipants = ({ participants }: any) => {
  const p = [{}, {}, {}, {}, {}, {}, {}];
  return (
    <div>
      <section>
        <Title level={3}>Капитан команды</Title>
        <TeamParticipantCard user={{}}/>
      </section>
      <section>
        <Title level={3}>Игроки</Title>
        <div className={styles.section__participants}>
          {p && p.map((user: any, key: number)=> 
            <TeamParticipantCard key={key} user={user}/>
          )}
        </div>
      </section>
    </div>
  );
};

export default TeamParticipants;
