
import { useState } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import ActiveCrud from "../components/ActiveCrud/ActiveCrud";

import { AuthProvider, useAuth } from "AuthContext";
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  const { login, url, getidUser,getHeaderToken } = useAuth();

  const colNames = ['Nom', 'Prenom', 'Age', 'sexe'];
  // console.log("userInfop =>" + localStorage.getItem('userInfo'));
  // console.log("user id => " + getidUser());
  console.log(getHeaderToken());

  
  return (
    <>
      {/* <Header /> */}
      <br/>
      {/* <Container className="mt--7"  fluid>
        <ActiveCrud primaryKeyFieldName={'idMarque'} getEndPoint={'marque'} postEndPoint={'marque'} putEndPoint={'marque'} delEndPoint={'marque'} />
      </Container> */}
    </>
  );
};

export default Index;
