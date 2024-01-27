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
    const donnees = jsonData;
    const users = donnees.data.users;
    const revenuMensuels = donnees.data.revenuMensuels;
    const annonceMois = donnees.data.annonceMois;
    return { users, revenuMensuels, annonceMois };
  }

  

  const [dataParAnnee, setDataParAnnee] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [users, setUsers] = useState([]);
  const [revenuMensuels, setRevenuMensuels] = useState([]);
  const [annonceMois, setAnnonceMois] = useState([]);
  const anneeActuelle = new Date().getFullYear();
  const [endPoint,setEndPoint] = useState("");

  useEffect(() => {
    const newEndPoint = `stat_annuel/${selectedYear}`;
    //console.log(newEndPoint);
    axios.get(`${url}${newEndPoint}`, getHeaderToken())
      .then(response => {
        // ... traitement de la réponse ...
        console.log("taftftaftafatfatafa")
        if (response.data.error === "aucun") {
          setDataParAnnee(response.data);
          const { users, revenuMensuels, annonceMois } = separerDonnees(response.data);
          setUsers(users);
          setRevenuMensuels(revenuMensuels);
          setAnnonceMois(annonceMois);
          setLoading(false);
          //alert(loading);
          
        }
      })
      .catch(error => {
        console.error('Erreur de requête :', error);
        handleRequestError(error);
      });
  }, [url, selectedYear, getHeaderToken]);


  function getMonthLetter(monthNumber) {
    var months = ['Janvier','Fevrier','Mars','Avril','Mais','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
    return months[monthNumber - 1];
  }
  
  
  
  function transformerUsers(users) {
    return users.map(user => {
      return {
        mois: getMonthLetter( user.mois ),
        nbUser: user.nbUsers
      };
    });
  }

  function transformerAnnonce(Annonces) {
    return Annonces.map(Annonce => {
      return {
        mois: getMonthLetter( Annonce.mois ),
        nbAnnonce: Annonce.nbAnnonce
      };
    });
  }
  function transformerrevenuMensuelsNbCommition(revenuMensuels) {
    return revenuMensuels.map(revenue => {
      return {
        mois: getMonthLetter( revenue.mois ),
        nbCommission: revenue.nbCommission
      };
    });
  }

  function transformerrevenuMensuelstotalCommission(revenuMensuels) {
    return revenuMensuels.map(totalCommission => {
      return {
        mois: getMonthLetter( totalCommission.mois ),
        totalCommission: totalCommission.totalCommission
      };
    });
  }

  const usersData = transformerUsers(users);
  const AnnoncesData = transformerAnnonce(annonceMois);
  const revenuMensuelsNbCommition = transformerrevenuMensuelsNbCommition(revenuMensuels);
  const revenuMensuelstotalCommission = transformerrevenuMensuelstotalCommission(revenuMensuels);
  
  console.log(usersData);
  const handleYearChange = (e) => {
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const yearInputValue = document.getElementById('yearInput').value;
  
    if (!isNaN(yearInputValue) && yearInputValue >= 1950 && yearInputValue <= new Date().getFullYear()) {
      setSelectedYear(yearInputValue);
      setLoading(true);
      console.log('Année sélectionnée : ' + yearInputValue);
    } else {
      alert('Veuillez entrer une année valide.');
    }
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
          <CardHeader className="bg-transparent">
          <h5 style={{ textAlign: 'center' }}>Nombre d'utilisateurs</h5>
            <div className={styles.StatTest}>
              {loading ? (
                <Row>
                  <Col></Col>
                  <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                  <Col></Col>
                </Row>
                  
                ) : (
              <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
                {/* <VictoryAxis /> */}
                <VictoryAxis 
                 tickLabelComponent={<VictoryLabel angle={-45} y={320} />}
                  
                />
                <VictoryAxis dependentAxis  />
                <VictoryBar data={usersData}  x='mois' y="nbUser" />
              </VictoryChart>
              )}
            </div>
            </CardHeader>
          </Card>
        </Col>

        <Col>
          <Card className='shadow'>
          <CardHeader className="bg-transparent">
          <h5 style={{ textAlign: 'center' }}>Nombre d'annonces</h5>
            <div className={styles.StatTest}>
            {loading ? ( 
                <Row>
                  <Col></Col>
                  <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                  <Col></Col>
                </Row>
                  
             ) : (
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis  
                  tickLabelComponent={<VictoryLabel angle={-45} y={320} />}
                />
                <VictoryAxis dependentAxis />
                <VictoryBar data={AnnoncesData} x="mois" y="nbAnnonce" />
              </VictoryChart>
            )}
            </div>
          </CardHeader>
          </Card>
        
        </Col>

      </Row>
      <br></br>
      <Row>
        <Col>
          <Card className='shadow'>
            <CardHeader className="bg-transparent">
            <h5 style={{ textAlign: 'center' }}>Nombre de commission obtenus</h5>
              <div className={styles.StatTest}>
                {loading ? ( 
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                    
                ) : (
                <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                  <VictoryAxis 
                    tickLabelComponent={<VictoryLabel angle={-45} y={320} />}
                  />
                  <VictoryAxis dependentAxis />
                  <VictoryBar data={revenuMensuelsNbCommition} x="mois" y="nbCommission" />
                </VictoryChart>
                )}
              </div>
            </CardHeader>
          </Card>
        </Col>

        <Col>
          <Card className='shadow'>
          <CardHeader className="bg-transparent">
          <h5 style={{ textAlign: 'center' }}>Total revenus des commissions</h5>
            <div className={styles.StatTest}>
            {loading ? ( 
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                    
                ) : (
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis 
                  tickLabelComponent={<VictoryLabel angle={-45} y={320} />}
                />
                <VictoryAxis dependentAxis />
                <VictoryBar data={revenuMensuelstotalCommission} x="mois" y="totalCommission" />
              </VictoryChart>
              )}
            </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};

StatAnnuel.propTypes = {};

StatAnnuel.defaultProps = {};

export default StatAnnuel;
