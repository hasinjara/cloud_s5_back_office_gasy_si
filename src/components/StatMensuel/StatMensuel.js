import React ,{ useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import styles from './StatMensuel.module.css';
import { Pie } from 'react-chartjs-2';
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
  Input
} from "reactstrap";

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


const StatMensuel = () => {
  const [loading, setLoading] = useState(true);
  const [dataMensuel, setDataMensuel] = useState(null);
  const { url, getHeaderToken, getToken, getHeaderTokenTest, handleRequestError } = useAuth();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [endPoint,setEndPoint] = useState("");
  const [statMarqueMensuels, setStatMarqueMensuels] = useState([]);
  const [statCategorieMensuels, setStatCategorieMensuels] = useState([]);
  const [statVoitureMensuels, setStatVoitureMensuels] = useState([]);
  const [statVendeurMensuels, setStatVendeurMensuels] = useState([]);


  function separerDonnees(jsonData) {
    const donnees = jsonData;
    const statMarqueMensuels= donnees.data.statMarqueMensuels;
    const statCategorieMensuels = donnees.data.statCategorieMensuels;
    const statVoitureMensuels = donnees.data.statVoitureMensuels;
    const statVendeurMensuels = donnees.data.statVendeurMensuels;
    return { statMarqueMensuels , statCategorieMensuels, statVoitureMensuels, statVendeurMensuels };
  }


  useEffect(() => {
    const newEndPoint = `stat_mensuel/${selectedMonth}/${selectedYear}`;
    //const newEndPoint = `stat_mensuel/1/2024`;
    //console.log(newEndPoint);
    axios.get(`${url}${newEndPoint}`, getHeaderToken())
      .then(response => {
        // ... traitement de la réponse ...
        console.log("taftftaftafatfatafa")
        if (response.data.error === "aucun") {
          setDataMensuel(response.data);
          const { statMarqueMensuels , statCategorieMensuels, statVoitureMensuels, statVendeurMensuels } = separerDonnees(response.data);
          setStatMarqueMensuels(statMarqueMensuels);
          setStatCategorieMensuels(statCategorieMensuels);
          setStatVoitureMensuels(statVoitureMensuels);
          setStatVendeurMensuels(statVendeurMensuels);
          setLoading(false);
          //alert(loading);
          
        }
      })
      .catch(error => {
        console.error('Erreur de requête :', error);
        handleRequestError(error);
      });
  }, [url, selectedYear, selectedMonth ,getHeaderToken]);

  const handleSubmit = () => {
    setLoading(true);
    const yearInputValue = document.getElementById('yearInput').value;
    const monthSelect = document.getElementById('monthSelect').value;
    setSelectedYear(yearInputValue);
    setSelectedMonth(monthSelect);
    
  };

  const giveTitle = (text) => {
    return {
      title: {
        display: true,
        text: text,
      },
    };
  };

  // marque
  const marques = statMarqueMensuels?.map(item => item.marque) || [];
  const nbMarques = statMarqueMensuels?.map(item => item.nbCommission) || [];
  const totalCommissionMarque = statMarqueMensuels?.map(item => item.commissionTotal) || [];
  const randColorMarque = marques.map(() => generateRandomColor());

  const dataNbMarque = {
    labels: marques ,
    datasets: [
      {
        data: nbMarques,
        backgroundColor: randColorMarque,
        hoverOffset: 4
      },
    ],
  };

  const dataCommissionMarque = {
    labels: marques ,
    datasets: [
      {
        data: totalCommissionMarque,
        backgroundColor: randColorMarque,
        hoverOffset: 4
      },
    ],
  };

  // Pour statCategorieMensuels
const categories = statCategorieMensuels?.map(item => item.categorie) || [];
const nbCategories = statCategorieMensuels?.map(item => item.nbCommission) || [];
const totalCommissionCategorie = statCategorieMensuels?.map(item => item.commissionTotal) || [];
const randColorCategorie = categories.map(() => generateRandomColor());


const dataNbCategorie = {
  labels: categories,
  datasets: [
    {
      data: nbCategories,
      backgroundColor: randColorCategorie,
      hoverOffset: 4
    },
  ],
};

const dataCommissionCategorie = {
  labels: categories,
  datasets: [
    {
      data: totalCommissionCategorie,
      backgroundColor: randColorCategorie,
      hoverOffset: 4
    },
  ],
};

// Pour statVoitureMensuels
const voitures = statVoitureMensuels?.map(item => item.nomModele) || [];
const nbVoitures = statVoitureMensuels?.map(item => item.nbCommission) || [];
const totalCommissionVoiture = statVoitureMensuels?.map(item => item.commissionTotal) || [];
const randColorVoiture = voitures.map(() => generateRandomColor());

const dataNbVoiture = {
  labels: voitures,
  datasets: [
    {
      data: nbVoitures,
      backgroundColor: randColorVoiture,
      hoverOffset: 4
    },
  ],
};

const dataCommissionVoiture = {
  labels: voitures,
  datasets: [
    {
      data: totalCommissionVoiture,
      backgroundColor: randColorVoiture,
      hoverOffset: 4
    },
  ],
};

// Pour statVendeurMensuels
const vendeurs = statVendeurMensuels?.map(item => item.nom) || [];
const nbVendeurs = statVendeurMensuels?.map(item => item.nbCommission) || [];
const totalCommissionVendeur = statVendeurMensuels?.map(item => item.commissionTotal) || [];
const randColorVendeur = vendeurs.map(() => generateRandomColor());

const dataNbVendeur = {
  labels: vendeurs,
  datasets: [
    {
      data: nbVendeurs,
      backgroundColor: randColorVendeur,
      hoverOffset: 4
    },
  ],
};

const dataCommissionVendeur = {
  labels: vendeurs,
  datasets: [
    {
      data: totalCommissionVendeur,
      backgroundColor: randColorVendeur,
      hoverOffset: 4
    },
  ],
};



  

  return (
    <Container className="mt--7" fluid>
      <Row style={{ marginTop: '100px' }}>
        <Col>
          <Card className='shadow'>
            <Col>
            <label htmlFor="yearInput">Année :</label>
          <input
            type="number"
            id="yearInput"
            value={selectedYear}
          />

          <label htmlFor="monthSelect">Mois :</label>
          <select
            id="monthSelect"
          >
            <option value={1}>Janvier</option>
            <option value={2}>Février</option>
            <option value={3}>Mars</option>
            <option value={4}>Avril</option>
            <option value={5}>Mai</option>
            <option value={6}>Juin</option>
            <option value={7}>Juillet</option>
            <option value={8}>Août</option>
            <option value={9}>Septembre</option>
            <option value={10}>Octobre</option>
            <option value={11}>Novembre</option>
            <option value={12}>Décembre</option>
          </select>
            </Col>
            <Col>
              <button onClick={handleSubmit} className='btn bn-primary' style={{ backgroundColor: "black", color: "white", fontSize: "smaller" }}> Submit</button>
            </Col>
            {selectedYear && (
              <div>
                <h4>Année sélectionnée : {selectedYear} {selectedMonth}</h4>
              </div>
            )}
          </Card>
        </Col>
        <Col></Col>
      </Row>
      
      {/* Marque */}
      <Row style={{ marginTop: '100px' }} >
        <Col>
          <Card className='shadow'>
            <CardHeader className="bg-transparent">
              {/* <h5 style={{ textAlign: 'center' }}>Nombre d'utilisateurs</h5> */}
              <div className={styles.StatTest}>
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <Pie data={dataNbMarque} options={giveTitle('Nombre de commission par marque')} />
                )}
              </div>
            </CardHeader>
          </Card>
        </Col>
        <Col>
          <Card className='shadow'>
            <CardHeader className="bg-transparent">
              {/* <h5 style={{ textAlign: 'center' }}>Nombre d'utilisateurs</h5> */}
              <div className={styles.StatTest}>
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <Pie data={dataCommissionMarque} options={giveTitle('Revenu par marque')} />
                )}
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>



      {/* Voiture */}
      <Row style={{ marginTop: '100px' }} >
        <Col>
          <Card className='shadow'>
            <CardHeader className="bg-transparent">
              {/* <h5 style={{ textAlign: 'center' }}>Nombre d'utilisateurs</h5> */}
              <div className={styles.StatTest}>
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <Pie data={dataNbVoiture} options={giveTitle('Nombre de commission par voiture')} />
                )}
              </div>
            </CardHeader>
          </Card>
        </Col>
        <Col>
          <Card className='shadow'>
            <CardHeader className="bg-transparent">
              {/* <h5 style={{ textAlign: 'center' }}>Nombre d'utilisateurs</h5> */}
              <div className={styles.StatTest}>
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <Pie data={dataCommissionVoiture} options={giveTitle('Revenu par voiture')} />
                )}
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>

        {/* Categorie */}
      <Row style={{ marginTop: '100px' }} >
        <Col>
          <Card className='shadow'>
            <CardHeader className="bg-transparent">
              {/* <h5 style={{ textAlign: 'center' }}>Nombre d'utilisateurs</h5> */}
              <div className={styles.StatTest}>
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <Pie data={dataNbCategorie} options={giveTitle('Nombre de commission par categorie')} />
                )}
              </div>
            </CardHeader>
          </Card>
        </Col>
        <Col>
          <Card className='shadow'>
            <CardHeader className="bg-transparent">
              {/* <h5 style={{ textAlign: 'center' }}>Nombre d'utilisateurs</h5> */}
              <div className={styles.StatTest}>
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <Pie data={dataCommissionCategorie} options={giveTitle('Revenu par categorie')} />
                )}
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>      


       {/* Vendeur */}
      <Row style={{ marginTop: '100px' }} >
        <Col>
          <Card className='shadow'>
            <CardHeader className="bg-transparent">
              {/* <h5 style={{ textAlign: 'center' }}>Nombre d'utilisateurs</h5> */}
              <div className={styles.StatTest}>
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <Pie data={dataNbVendeur} options={giveTitle('Top vendeur')} />
                )}
              </div>
            </CardHeader>
          </Card>
        </Col>
        <Col>
          <Card className='shadow'>
            <CardHeader className="bg-transparent">
              {/* <h5 style={{ textAlign: 'center' }}>Nombre d'utilisateurs</h5> */}
              <div className={styles.StatTest}>
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <Pie data={dataCommissionVendeur} options={giveTitle('Revenu par vendeur')} />
                )}
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>        



    </Container>
  );
};

StatMensuel.propTypes = {};

StatMensuel.defaultProps = {};

export default StatMensuel;
