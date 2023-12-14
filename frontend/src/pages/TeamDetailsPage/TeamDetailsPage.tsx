import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Spin, Avatar, Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { loginUser } from "../../services/User/action";
import styles from "./TeamDetailsPage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";

// import { useRootSelector } from "../../hooks/UseRootSelector";
// import { useAppDispatch } from "../../hooks/UseAppDispatch";
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
const TeamDetailsPage = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(()=>{
    // dispatch(getTeams());
  },[])
  console.log(id)
  return (
    <div className={styles.container}>
      TeamDetailsPage
    </div>
  );
};

export default TeamDetailsPage;
