import React from 'react';
import PropTypes from 'prop-types';
import styles from './MarqueCrud.module.css';

import { useState } from "react";
import Chart from "chart.js";

import {
  Container,
} from "reactstrap";
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";
import Header from "components/Headers/Header.js";
import ActiveCrud from "../ActiveCrud/ActiveCrud";
import { AuthProvider, useAuth } from "AuthContext";



const MarqueCrud = (props) => {
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
  const { login, url, getidUser, getHeaderToken } = useAuth();
  return (
    <>
      <Header />
      <div className={styles.MarqueCrud}>
        <Container className="mt--7" fluid>
          <ActiveCrud primaryKeyFieldName={'idMarque'} getEndPoint={'marque'} postEndPoint={'marque'} putEndPoint={'marque'} delEndPoint={'marque'} />
        </Container>
      </div>
    </>
  );
}

MarqueCrud.propTypes = {};

MarqueCrud.defaultProps = {};

export default MarqueCrud;
