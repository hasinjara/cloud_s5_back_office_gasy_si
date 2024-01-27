import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './StatAnnuel.module.css';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import { useAuth } from 'AuthContext';
import axios from 'axios';
import { TailSpin as Loader } from 'react-loader-spinner';

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

const StatAnnuel = () => {
  
  const [chartData, setChartData] = useState(null);
  const { url, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const data = [
    { category: 'A', value: 10 },
    { category: 'B', value: 15 },
    { category: 'C', value: 20 },
    { category: 'D', value: 12 },
  ];

  return (
    <div className={styles.StatTest}>
      <VictoryChart theme={VictoryTheme.material}
        domainPadding={20} >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryBar data={data} x="category" y="value" />
      </VictoryChart>
    </div>
  );
};
StatAnnuel.propTypes = {};

StatAnnuel.defaultProps = {};

export default StatAnnuel;
