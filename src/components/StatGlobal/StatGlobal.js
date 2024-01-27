import React , { useState, useEffect }  from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import PropTypes from 'prop-types';
import styles from './StatGlobal.module.css';
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

import Header from "components/Headers/Header.js";


// const StatGlobal = () => (
//   <div className={styles.StatGlobal}>
//     StatGlobal Component
//   </div>
// );



const StatGlobal= () => {
  const [chartData, setChartData] = useState(null);
  const { url, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    chartData: null,
    loading: true
  })

  const fetchData = () => {
    console.log('AXIOS');
      axios.get(`${url}stat_global`, {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((response) => {
        console.log(response);
              if (!response.data || !response.data.data) {
        console.error('No data received or data structure is incorrect.');
        return;
      }
      
      const data = response.data.data;
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
    // try {
    //   const response = await axios.get(`${url}stat_global`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${getToken()}`,
    //     },
    //   });

    //   if (!response.data || !response.data.data) {
    //     console.error('No data received or data structure is incorrect.');
    //     return;
    //   }

    //   const data = response.data.data;
    //   setChartData(data);

    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
    // finally {
    //   // Définir le chargement sur false lorsque la requête est terminée
    //   setLoading(false);
    // }
  // };
  
  useEffect(() => {
    console.log("FETCHHHHHHH");
    fetchData();
  }, [url, getToken()]);


  const nomModeleArray = chartData?.statVoitureGlobals?.map(item => item.nomModele) || [];
  const nbAnnonceStatVoiture = chartData?.statVoitureGlobals?.map(item => item.nbAnnonce) || [];
  const marque = chartData?.statMarqueGlobals?.map(item => item.marque) || [];
  const nbAnnonceStatMarque = chartData?.statMarqueGlobals?.map(item => item.nbAnnonce) || [];
  const categorie = chartData?.statCategorieGlobals?.map(item => item.categorie) || [];
  const nbAnnonceStaCategorie = chartData?.statCategorieGlobals?.map(item => item.nbAnnonce) || [];

  console.log(nomModeleArray);


  const dataVoiture  = nomModeleArray.map((label, index) => ({
    x: index + 1,
    y: nbAnnonceStatVoiture[index],
    label : label + '  .'
  }));
  //console.log(dataVoiture);
  

  // const dataVoiture = {
  //   labels: nomModeleArray,
  //   datasets: [
  //     {
  //       label: `Nombre d'annonce par voiture`,
  //       backgroundColor: 'rgba(75,192,192,0.2)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(75,192,192,0.4)',
  //       hoverBorderColor: 'rgba(75,192,192,1)',
  //       data: nbAnnonceStatVoiture,
  //     },
  //   ],
  // };

  const dataMarque = marque.map((label, index) => ({
    x: index + 1,
    y: nbAnnonceStatMarque[index],
    label: label + '  .',
  }));

  // const dataMarque = {
  //   labels: marque,
  //   datasets: [
  //     {
  //       label: `Nombre d'annonce par marque`,
  //       backgroundColor: 'rgba(75,192,192,0.2)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(75,192,192,0.4)',
  //       hoverBorderColor: 'rgba(75,192,192,1)',
  //       data: nbAnnonceStatMarque,
  //     },
  //   ],
  // };

  const dataCateg = categorie.map((label, index) => ({
    x: index + 1,
    y: nbAnnonceStaCategorie[index],
    label: label + '  .',
  }));


  // const dataCateg = {
  //   labels: categorie,
  //   datasets: [
  //     {
  //       label: `Nombre d'annonce par Categorie`,
  //       backgroundColor: 'rgba(75,192,192,0.2)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(75,192,192,0.4)',
  //       hoverBorderColor: 'rgba(75,192,192,1)',
  //       data: nbAnnonceStaCategorie,
  //     },
  //   ],
  // };

  

  // const options = {
  //   scales: {
  //     x: {
  //       beginAtZero: true, // Commencer à zéro
  //       // Autres options de l'axe X
  //     },
  //     y: {
  //       beginAtZero: true,
  //       // Autres options de l'axe Y
  //     },
  //   },
  // };


  return (
    <>
      {/* <Header /> */}
      <Container className="mt--7" fluid> 
      
          <Col className="mb-5 mb-xl-0">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h2 style={{ textAlign: 'center' }}>Nombre d'annonce par voiture</h2>
                {state.loading ? (
                  <Row>
                  <Col></Col>
                  <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                  <Col></Col>
                </Row>
                ) : (
                  
                  <VictoryChart theme={VictoryTheme.material}
                      domainPadding={10} >
                      <VictoryAxis tickFormat={() => ''} />
                      
                      <VictoryAxis dependentAxis />
                      
                      <VictoryBar 
                        data={dataVoiture}  
                        labelComponent={<VictoryLabel angle={90} verticalAnchor="start" textAnchor="end" />}
                      />

                  </VictoryChart>
                )}
              </CardHeader> 
            </Card> 
          </Col>

          <Col className="mb-5 mb-xl-0">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h2 style={{ textAlign: 'center' }}>Nombre d'annonce par marque</h2>
                {loading ? (
                  <Row>
                  <Col></Col>
                  <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                  <Col></Col>
                </Row>
                ) : (
                  <VictoryChart theme={VictoryTheme.material}
                    domainPadding={20} >
                    <VictoryAxis tickFormat={() => ''} />
                    <VictoryAxis dependentAxis />
                    
                    <VictoryBar 
                      data={dataMarque}  
                      labelComponent={<VictoryLabel angle={90} verticalAnchor="start" textAnchor="end" />}
                    />

                  </VictoryChart>
                )}
              </CardHeader> 
            </Card> 
          </Col>

          <Col className="mb-5 mb-xl-0">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h2 style={{ textAlign: 'center' }}>Nombre d'annonce par categorie</h2>
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <VictoryChart theme={VictoryTheme.material}
                    domainPadding={20} >
                   <VictoryAxis tickFormat={() => ''} />
                    <VictoryAxis dependentAxis />
                    
                    <VictoryBar 
                      data={dataCateg}  
  
                      labelComponent={<VictoryLabel angle={90} verticalAnchor="start" textAnchor="end" />}
                    />

                </VictoryChart>
                )}
              </CardHeader> 
            </Card> 
          </Col>
      
      </Container>
    </>
  );
};

StatGlobal.propTypes = {};

StatGlobal.defaultProps = {};

export default StatGlobal;
