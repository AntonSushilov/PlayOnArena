import { Spin, Avatar, Card, Typography, Table, Form, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import TeamParticipantCard from "../TeamParticipantCard/TeamParticipantCard";
import styles from "./TournamentGrid.module.css";
import TeamCard from "../TeamCard/TeamCard";
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

const TournamentGrid = ({ teams }: any) => {
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

  let matrix = Array.from(Array(teamss.length), () => new Array(teamss.length));
  console.log("hello");
  for (var i = 0; i < teamss.length; i++) {
    for (var j = 0; j < teamss.length; j++) {
      if (i == j) {
        matrix[i][j] = "-";
      } else {
        if (i < j) {
          const owner = teamss[i];
          const guest = teamss[j];
          let match = matches.find(
            (el) =>
              Number(el.owner) == Number(owner.id) &&
              Number(el.guest) == Number(guest.id)
          );
          if (match) {
            console.log(owner, guest);
            console.log(match);
            matrix[i][j] = `${match?.owner_points} - ${match?.guest_points}`;
            matrix[j][i] = `${match?.guest_points} - ${match?.owner_points}`;
          } else {
            match = matches.find(
              (el) =>
                Number(el.owner) == Number(guest.id) &&
                Number(el.guest) == Number(owner.id)
            );
            matrix[i][j] = `${match?.guest_points} - ${match?.owner_points}`;
            matrix[j][i] = `${match?.owner_points} - ${match?.guest_points}`;
          }
        }
      }
    }
  }

  // const columns_teams = matrix.map((el, key)=> {
  //   return {
  //     title: key+1,
  //     dataIndex: key+1,
  //     key: key+1,
  //   }
  // })
  const columns: any = [
    {
      title: "№",
      dataIndex: "number",
      rowScope: "row",
    },
    {
      title: "Команда",
      dataIndex: "team_name",
      key: "team_name",
    },
    ...matrix.map((el, key) => {
      return {
        title: key + 1,
        dataIndex: key + 1,
        key: key + 1,
      };
    }),
  ];

  let dataSource_teams: any = [];
  for (var i = 0; i < matrix.length; i++) {
    const tmp: any = {
      number: i + 1,
      team_name: teamss[i].title,
    };
    matrix[i].map((el, key) => {
      tmp[key + 1] = el;
    });
    dataSource_teams.push(tmp);
  }

  console.log(dataSource_teams);

  console.log(matrix);

  return (
    <section>
      <Table
        columns={columns}
        dataSource={dataSource_teams}
        bordered
        pagination={false}
      />
    </section>
  );
};

export default TournamentGrid;
