
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
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

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import StaticCrud from "../components/customised/StaticCrud";
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
      <Header />
      <Container className="mt--7" fluid>
        {/* <StaticCrud/> */}
        <ActiveCrud primaryKeyFieldName={'idMarque'} getEndPoint={'marque'} postEndPoint={'marque'} putEndPoint={'marque'} delEndPoint={'marque'} />
      </Container>
    </>
  );
};

export default Index;
