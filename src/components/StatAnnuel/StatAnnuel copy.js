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
  const { url, getHeaderToken, getToken, getHeaderTokenTest, handleRequestError } = useAuth();

  function separerDonnees(jsonData) {
    // const donnees = JSON.parse(jsonData);
    const donnees = jsonData;
    const users = donnees.data.users;
    const revenuMensuels = donnees.data.revenuMensuels;
    const annonceMois = donnees.data.annonceMois;
    return { users, revenuMensuels, annonceMois };
  }



  const [dataParAnnee, setDataParAnnee] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(null);
  const [state, setState] = useState({
    chartData: null,
    loading: true
  })

  const endpoint = "stat_annuel/" + 2024;
  const fetchData = () => {
    alert("1");
    axios.get("https://devvoitures5backend-production.up.railway.app/stat_annuel/2024", {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((response) => {
      alert(response);
      if (!response.data || !response.data.data) {
        console.error('No data received or data structure is incorrect.');
        return;
      }

      const data = response.data.data;
      setDataParAnnee(response.data);
      setChartData(data);
      setLoading(false)
      setState((state) => ({
        ...state,
        chartData: data,
        loading: false
      }))
    }).catch((err) => {
      console.log(err);
      setState((state) => ({
        ...state,
        loading: false
      }))
    })
  }
  useEffect(() => {
    fetchData();
  }, [url, getToken()]);

  const { users, revenuMensuels, annonceMois } = separerDonnees(dataParAnnee);
  const anneeActuelle = new Date().getFullYear();
  function transformerUsers(users) {
    return users.map(user => {
      return {
        mois: user.mois,
        nbUser: user.nbUsers
      };
    });
  }

  function transformerAnnonce(Annonces) {
    return Annonces.map(Annonce => {
      return {
        mois: Annonce.mois,
        nbAnnonce: Annonce.nbAnnonce
      };
    });
  }
  function transformerrevenuMensuelsNbCommition(revenuMensuels) {
    return revenuMensuels.map(revenue => {
      return {
        mois: revenue.mois,
        nbCommission: revenue.nbCommission
      };
    });
  }

  function transformerrevenuMensuelstotalCommission(revenuMensuels) {
    return revenuMensuels.map(totalCommission => {
      return {
        mois: totalCommission.mois,
        totalCommission: totalCommission.totalCommission
      };
    });
  }

  const usersData = transformerUsers(users);
  const AnnoncesData = transformerAnnonce(annonceMois);
  const revenuMensuelsNbCommition = transformerrevenuMensuelsNbCommition(revenuMensuels);
  const revenuMensuelstotalCommission = transformerrevenuMensuelstotalCommission(revenuMensuels);

  const handleYearChange = (e) => {
  };

  const handleSubmit = (e) => {
    setSelectedYear(e.target.value);
    console.log('annee : ' + selectedYear);
  };


  return (
    <Container className="mt--7" fluid>
      <Row style={{ marginTop: '100px' }} >
        <Col>
          <Card className='shadow'>
            <Col>
              <input
                type="number"
                id="yearInput"
                value={selectedYear || ''}
                onChange={handleYearChange}
                min="1950"
                max={anneeActuelle}
              />
            </Col>
            <Col>
              <button onClick={handleSubmit} className='btn bn-primary' style={{ backgroundColor: "black", color: "white", fontSize: "smaller" }} > Submit</button>
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
                <VictoryBar data={usersData} x="mois" y="nbUser" />
              </VictoryChart>
            </div>
          </Card>
        </Col>
        {/* <Col>
          <Card className='shadow'>
            <div className={styles.StatTest}>
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar data={AnnoncesData} x="mois" y="nbAnnonce" />
              </VictoryChart>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className='shadow'>
            <div className={styles.StatTest}>
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar data={revenuMensuelsNbCommition} x="mois" y="nbCommission" />
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
                <VictoryBar data={revenuMensuelstotalCommission} x="mois" y="totalCommission" />
              </VictoryChart>
            </div>
          </Card>
        </Col> */}
      </Row>
    </Container>

  );
};

StatAnnuel.propTypes = {};

StatAnnuel.defaultProps = {};

export default StatAnnuel;
