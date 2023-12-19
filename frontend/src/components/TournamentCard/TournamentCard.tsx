import React, { Component } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import classNames from "classnames";
import { Spin, Avatar, Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./TournamentCard.module.css";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
// import Navbar from "./Navbar";

export const TournamentCard = ({ tournament }: any) => {
  const location = useLocation();
  console.log(tournament);
  const start_date = new Date(tournament.start_date).toLocaleDateString()
  const end_date = new Date(tournament.end_date).toLocaleDateString()
  return (
    <Link to={`/tournaments/${tournament.id}`} state={{ background: location }}>
      <Card
        // title={team.title}
        hoverable
        // style={{ width: 240 }}
        bordered={true}
      >
        <div className={styles.card__content}>
          <Avatar
            size={128}
            shape="square"
            style={{ backgroundColor: "white", verticalAlign: "middle" }}
            icon={<img src="media\images\tournaments\1593010589xlZ59.png" style={{ objectFit: "contain"}}></img>}
          />
          <Typography>
            <Title level={3}>{tournament?.title}</Title>
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
              <Text type="secondary">{tournament.city.name_ru}</Text>
              <Text type="secondary">{tournament.country.name_ru}</Text>
            </Paragraph>
            <Paragraph
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <Text type="secondary">{tournament.sport_type.title}</Text>
            </Paragraph>
          </Typography>
        </div>
      </Card>
    </Link>
  );
};

export default TournamentCard;
