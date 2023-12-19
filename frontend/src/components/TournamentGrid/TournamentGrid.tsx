import {
  Spin,
  Avatar,
  Card,
  Typography,
  Table,
  Form,
  Button,
  Modal,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import TeamParticipantCard from "../TeamParticipantCard/TeamParticipantCard";
import styles from "./TournamentGrid.module.css";
import TeamCard from "../TeamCard/TeamCard";
import CreateTournamentGridPage from "../../pages/CreateTournamentGridPage/CreateTournamentGridPage";
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

const TournamentGrid = ({ teams, matches }: any) => {
  let matrix = Array.from(Array(teams.length), () => new Array(teams.length));
  // console.log("hello");
  for (var i = 0; i < teams.length; i++) {
    for (var j = 0; j < teams.length; j++) {
      if (i == j) {
        matrix[i][j] = "-";
      } else {
        if (i < j) {
          const owner = teams[i];
          const guest = teams[j];
          let match = matches.find(
            (el: any) =>
              Number(el.owner) == Number(owner.id) &&
              Number(el.guest) == Number(guest.id)
          );
          if (match) {
            // console.log(owner, guest);
            // console.log(match);
            matrix[i][j] = `${match?.owner_points} - ${match?.guest_points}`;
            matrix[j][i] = `${match?.guest_points} - ${match?.owner_points}`;
          } else {
            match = matches.find(
              (el: any) =>
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
  const columns: any = [
    {
      title: "№",
      dataIndex: "number",
      key: "number",
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
      team_name: teams[i].title,
      key: i + 1,
    };
    matrix[i].map((el, key) => {
      tmp[key + 1] = el;
    });
    dataSource_teams.push(tmp);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState<string>("");
  const showModal = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    type: string
  ) => {
    setIsModalOpen(true);
    setTypeModal(type);
  };

  const titleModal: Record<string, React.ReactNode> = {
    createTournamentGrid: "Формирование турнирной сетки",
  };
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setTypeModal("");
  };

  const handleOk = (values: any) => {
    switch (typeModal) {
      case "createTournamentGrid":
        // console.log("createTeam");
        break;
      default:
        break;
    }

    // setIsModalOpen(false);
  };

  return (
    <>
      <section>
        {matches.length > 0 ? (
          <Table
            columns={columns}
            dataSource={dataSource_teams}
            bordered
            pagination={false}
          />
        ) : (
          <>
            <Title level={3}>Турнирной сетки еще нет</Title>
            <Button
              type="primary"
              onClick={(e) => showModal(e, "createTournamentGrid")}
            >
              Сформировать турнирную сетку
            </Button>
          </>
        )}
      </section>
      <Modal
        title={titleModal[typeModal]}
        okText="Создать"
        cancelText="Закрыть"
        open={isModalOpen}
        // open={true}
        onCancel={handleCancel}
        style={{ top: 120 }}
        width="fit-content"
        destroyOnClose={true}
        footer={[
          
        ]}
      >
        <CreateTournamentGridPage teams={teams} handleCancel={handleCancel}/>
      </Modal>
    </>
  );
};

export default TournamentGrid;
