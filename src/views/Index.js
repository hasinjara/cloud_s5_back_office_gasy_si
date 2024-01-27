
import { useState } from "react";
import Chart from "chart.js";

import {

  Container,

} from "reactstrap";

import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import ActiveCrud from "../components/ActiveCrud/ActiveCrud";

import { useAuth } from "AuthContext";
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
  const {getHeaderToken } = useAuth();

  // console.log("userInfop =>" + localStorage.getItem('userInfo'));
  // console.log("user id => " + getidUser());
  console.log(getHeaderToken());

  
  return (
    <>
      <Container className="mt--7" fluid>
        {/* <StaticCrud/> */}
        <ActiveCrud primaryKeyFieldName={'idMarque'} getEndPoint={'marque'} postEndPoint={'marque'} putEndPoint={'marque'} delEndPoint={'marque'} />
      </Container>
    </>
  );
};

export default Index;
