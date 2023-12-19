import React, { ChangeEvent, FormEvent, useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Spin, Card, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { loginUser } from "../../services/User/action";
import styles from "./TournamentsPage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { getTournaments } from "../../services/Tournament/action";
import { useAppSelector } from "../../hooks/UseAppSelector";
import TournamentCard from "../../components/TournamentCard/TournamentCard";
// import { useRootSelector } from "../../hooks/UseRootSelector";
// import { useAppDispatch } from "../../hooks/UseAppDispatch";

const TournamentsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTournaments());
  }, []);
  const { tournaments, getTournamentsRequest }: any = useAppSelector(
    (store) => ({
      tournaments: store.tournamentReducer.tournaments,
      getTournamentsRequest: store.tournamentReducer.getTournamentsRequest,
    }),
    // @ts-ignore
    shallowEqual
  );
  console.log("tournaments", tournaments);

  const nowDate = new Date();
  const сurrent_tournaments: [] = useMemo(
    () =>
      tournaments.filter(
        (el: any) =>
          nowDate >= new Date(el.start_date) && nowDate <= new Date(el.end_date)
      ),
    [tournaments]
  );

  // const nearest_tournaments: [] = useMemo(
  //   () => tournaments?.filter((el: any) => nowDate <= new Date(el.start_date)),
  //   [tournaments]
  // );

  // const сompleted_tournaments: [] = useMemo(
  //   () => tournaments?.filter((el: any) => nowDate >= new Date(el.end_date)),
  //   [tournaments]
  // );
  // const сurrent_tournaments: any = []
  const nearest_tournaments: any = []
  const сompleted_tournaments: any = []
  console.log("сurrent_tournaments", сurrent_tournaments);
  console.log("nearest_tournaments", nearest_tournaments);
  console.log("сompleted_tournaments", сompleted_tournaments);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          <Spin
            className={styles.spin}
            spinning={getTournamentsRequest}
            tip="Загрузка"
            size="large"
          >
            <Card
              title="Текущие турниры"
              bordered={false}
              style={{ width: "100%" }}
            >
              <div className={styles.content__tournaments}>
                {сurrent_tournaments && сurrent_tournaments.map(
                  (tournament: any, key: number) => 
                <TournamentCard key={key} tournament={tournament}/>

                )}
              </div>
            </Card>
          </Spin>
        </section>
        <section>
          <Spin
            className={styles.spin}
            spinning={getTournamentsRequest}
            tip="Загрузка"
            size="large"
          >
            <Card
              title="Близжайшие турниры"
              bordered={false}
              style={{ width: "100%" }}
            >
              <div className={styles.content__tournaments}>
                {nearest_tournaments && nearest_tournaments.map(
                  (tournament: any, key: number) => 
                <TournamentCard key={key} tournament={tournament}/>

                )}
              </div>
            </Card>
          </Spin>
        </section>
        <section>
          <Spin
            className={styles.spin}
            spinning={getTournamentsRequest}
            tip="Загрузка"
            size="large"
          >
            <Card
              title="Завершенные турниры"
              bordered={false}
              style={{ width: "100%" }}
            >
              <div className={styles.content__tournaments}>
                {сompleted_tournaments && сompleted_tournaments.map(
                  (tournament: any, key: number) => 
                <TournamentCard key={key} tournament={tournament}/>

                )}
              </div>
            </Card>
          </Spin>
        </section>
      </div>
    </div>
  );
};

export default TournamentsPage;
