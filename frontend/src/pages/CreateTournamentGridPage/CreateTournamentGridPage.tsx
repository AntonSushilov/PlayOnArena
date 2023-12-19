import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Form,
  Button,
  Card,
  Input,
  Typography,
  Select,
  Avatar,
  List,
  DatePicker,
} from "antd";
import { Upload } from "antd";
// import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { beforeUpload, convertToBase64 } from "../../utils/uploadImage";
import { shallowEqual, useDispatch } from "react-redux";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { createTournamentGrid, saveTournamentGrid } from "../../services/Tournament/action";
import { useAppSelector } from "../../hooks/UseAppSelector";
import TournamentGrid from "../../components/TournamentGrid/TournamentGrid";
import styles from "./CreateTournamentGridPage.module.css";
const { Title, Paragraph, Text } = Typography;
const CreateTournamentGridPage = ({
  teams,
  handleCancel,
}: any): JSX.Element => {
  const [filterTeams, setFilterTeams] = useState<any>(teams);
  const { detailTournament, tournamentGrid }: any = useAppSelector(
    (store) => ({
      detailTournament: store.tournamentReducer.detailTournament,
      tournamentGrid: store.tournamentReducer.tournamentGrid,
    }),
    // @ts-ignore
    shallowEqual
  );
  const rounds: any = useMemo(
    () => Array.from(new Set(tournamentGrid?.map((el: any) => el.round))),
    [tournamentGrid]
  );
  console.log(rounds, tournamentGrid);
  const shuffleList = () => {
    const array = structuredClone(filterTeams);
    let m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    setFilterTeams(array);
  };
  const dispatch = useAppDispatch();
  const handleCreateTournamentGrid = () => {
    const ids: any = filterTeams.map((el: any) => el.id);
    console.log(ids);
    dispatch(createTournamentGrid(ids, detailTournament?.id));
  };

  const handleSaveTournamentGrid = () => {
    dispatch(saveTournamentGrid(tournamentGrid))
    handleCancel()
  };
  console.log("createTournamentGrid", tournamentGrid);
  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    console.log("onOk: ", value);
  };
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <List
          style={{ width: "100%" }}
          itemLayout="horizontal"
          dataSource={filterTeams}
          bordered
          renderItem={(item: any, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.logo} />}
                title={item.title}
              />
            </List.Item>
          )}
        />
        {/* <Button type="primary" onClick={shuffleList}>
          Перемешать команды
        </Button> */}
      </section>
      <section>
        {/* <Form
          // form={form}
          name="createGrid"
          autoComplete="off"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          style={{ width: 800 }}
        > */}
          {/* <Form.Item name="start_time" label="Время начала игр">
            <DatePicker picker="time" />
          </Form.Item>
          <Form.Item name="time_match" label="Продолжительность игры">
            <DatePicker picker="time" />
          </Form.Item>
          <Form.Item name="description" label="Описание команды">
            <Input.TextArea placeholder="Напишите описание команды" />
          </Form.Item>
        </Form> */}
        <Button type="primary" onClick={handleCreateTournamentGrid}>
          Сформировать сетку
        </Button>
      </section>
      <section>
        {tournamentGrid && (
          <TournamentGrid teams={teams} matches={tournamentGrid} />
        )}
      </section>
      <section style={{display:"flex", flexDirection: "column", gap:"12px"}}>
        {tournamentGrid &&
          rounds &&
          rounds?.map((r: any, key: number) => {
            const matches = tournamentGrid.filter((el: any) => el.round == r);
            return (
              <List
                header={<Title level={4}>{`Раунд ${r}`}</Title>}
                style={{ width: "100%" }}
                itemLayout="horizontal"
                dataSource={matches}
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
        {/* {tournamentGrid && 

rounds && rounds?.map((r: any, key: number)=> {
  
  return <List
  style={{ width: "100%" }}
  itemLayout="horizontal"
  dataSource={matches}
  bordered
  renderItem={(item: any, index) => (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={item.logo} />}
        title={item.title}
      />
    </List.Item>
  )}
/>
} */}
      </section>
      <section>
        <Button key="back" onClick={handleCancel}>
          Закрыть
        </Button>
        <Button type="primary" onClick={handleSaveTournamentGrid}>
          Сохранить
        </Button>
      </section>
    </div>
  );
};

export default CreateTournamentGridPage;
