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
  const [selectedYear, setSelectedYear] = useState(null);

  const data = [
    { category: 'A', value: 10 },
    { category: 'B', value: 15 },
    { category: 'C', value: 20 },
    { category: 'D', value: 12 },
    { category: 'E', value: 12 },
    { category: 'F', value: 12 },
    { category: 'G', value: 12 },
    { category: 'H', value: 12 },
    { category: 'I', value: 12 },
    { category: 'J', value: 12 },
    { category: 'K', value: 12 },
    { category: 'L', value: 12 },
  ];

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = () => {
    // Ajoutez votre logique pour gérer la soumission ici
    // Vous pouvez utiliser la valeur de selectedYear pour effectuer des actions
  };


  return (
    <Container className="mt--7" fluid>
      <Row style={{ marginTop: '100px' }} >
        <Col>
          <Card className='shadow'>
            <Col>
                <label htmlFor="yearInput">Année :</label>
                <input
                  type="number"
                  id="yearInput"
                  value={selectedYear || ''}
                  onChange={handleYearChange}
                />
              </Col>
              <Col>
              <button onClick={handleSubmit} className='btn bn-primary' style={{backgroundColor:"black",color:"white",fontSize:"smaller"}} > Submit</button>
              </Col>
            
            {selectedYear && (
              <div>
                <h4>Année sélectionnée : {selectedYear}</h4>
              </div>
            )}
          </Card>
        </Col>
        <Col></Col>
      </Row>

      <Row style={{ marginTop: '100px' }}>
        <Col>
          <Card className='shadow'>
            <div className={styles.StatTest}>
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar data={data} x="category" y="value" />
              </VictoryChart>
            </div>
          </Card>   
        </Col>
        <Col>
          <Card className='shadow'>
            <div className={styles.StatTest}>
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar data={data} x="category" y="value" />
              </VictoryChart>
            </div>
          </Card>   
        </Col>
        <Col>
          <Card className='shadow'>
            <div className={styles.StatTest}>
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar data={data} x="category" y="value" />
              </VictoryChart>
            </div>
          </Card>   
        </Col>
      </Row>
    </Container>
   
  );
};

StatAnnuel.propTypes = {};

StatAnnuel.defaultProps = {};

export default StatAnnuel;
