import React, { Component } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import classNames from "classnames";
import { Spin, Avatar, Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./TeamParticipantCard.module.css";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
// import Navbar from "./Navbar";

export const TeamParticipantCard = ({ user }: any) => {
  const location = useLocation();
  console.log(user);
  return (
    // <Link to={`/teams/${team.id}`} state={{ background: location }}>

        <div className={styles.card__content}>
          <Avatar
            size={128}
            // shape="square"
            // style={{ backgroundColor: "white", verticalAlign: "middle" }}
            icon={
              // <UserOutlined />
            <img src={user.photo} style={{ objectFit: "contain"}}></img>
          }
          />
          <Typography>
            <Title level={4}>{user.full_name}</Title>
            {/* <Paragraph
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <Text type="secondary">ФИО</Text>
            </Paragraph> */}
          </Typography>
        </div>
    // </Link>
  );
};

export default TeamParticipantCard;
