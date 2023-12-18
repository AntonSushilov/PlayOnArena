import React, { Component } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import classNames from "classnames";
import { Spin, Avatar, Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./TeamCard.module.css";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
// import Navbar from "./Navbar";

export const TeamCard = ({ team }: any) => {
  const location = useLocation();
  console.log(team);
  return (
    <Link to={`/teams/${team.id}`} state={{ background: location }}>
      <Card
        // title={team.title}
        hoverable
        style={{ width: "100%", height: "100%" }}
        bordered={true}
      >
        <div className={styles.card__content}>
          <Avatar
            size={128}
            shape="square"
            style={{ backgroundColor: "white", verticalAlign: "middle" }}
            icon={<img src={team.logo} style={{ objectFit: "contain"}}></img>}
          />
          <Typography>
            <Title level={3}>{team.title}</Title>
            <Paragraph
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <Text type="secondary">Москва</Text>
              <Text type="secondary">Россия</Text>
            </Paragraph>
          </Typography>
        </div>
      </Card>
    </Link>
  );
};

export default TeamCard;