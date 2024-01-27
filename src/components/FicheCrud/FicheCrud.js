import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FicheCrud.module.css';
import Voiture from 'components/voiture/voiture';
import { useAuth } from 'AuthContext';
import { useEffect } from 'react';
import axios from 'axios';

// import Chart from "chart.js";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap"
import FicheTechniqueElement from 'components/FicheTechniqueElement/FicheTechniqueElement';


const FicheCrud = (props) => {
  const { login, url, getIdUser, getHeaderToken, getToken, NeContientPasCharactereSpecial, estNegatif, estUnNombre, anneeActuelle } = useAuth();


  const [tabFicheTechnique, setTabFicheTechnique] = useState([]);

  const [idVoiture, setIdVoiture] = useState('');
  const [tabVoiture, setTabVoiture] = useState([]);

  const [tabEnergie, setTabEnergie] = useState([]);
  const [idEnergie, setIdEnergie] = useState('');

  const [tabBoite, setTabBoite] = useState([]);
  const [idBoite, setIdBoite] = useState('');

  const [moteur, setMoteur] = useState('');
  const [litreMoteur, setLitreMoteur] = useState('');
  const [consommation, setConsommation] = useState('');
  const [puissance, setPuissance] = useState('');
  const [nbVitesse, setNbVitesse] = useState('');
  const [nbPlace, setNbPlace] = useState('');
  const [nbPorte, setNbPorte] = useState('');
  const [longueur, setLongueur] = useState('');
  const [poids, setPoids] = useState('');


  const [IsCaractereValide, setIsCaractereValide] = useState('');
  const [IsNbPositif, setIsNbPositif] = useState('');
  const [IsDateValide, setIsDateValide] = useState('');
  const [areAllInputValide, setAreAllInputValide] = useState('');

  const ficheTechnique = {
    "idVoiture": idVoiture,
    "idEnergie": idEnergie,
    "idBoite": idBoite,
    "moteur": moteur,
    "litreMoteur": litreMoteur,
    "consommation": consommation,
    "puissance": puissance,
    "nbVitesse": nbVitesse,
    "nbPlace": nbPlace,
    "nbPorte": nbPorte,
    "longueur": longueur,
    "poids": poids
  }


  const postEndPoint = "voiture_fichetechnique";

  const getAllVoiture = async (urlPoint) => {
    try {
      const response = await axios.get(`${url}${urlPoint}`);
      setTabVoiture(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getAllFicheTechnique = async (urlPoint) => {
    try {
      const response = await axios.get(`${url}${urlPoint}`);
      setTabFicheTechnique(response.data.data);
      console.log`url xxxxxxxxxxxxxxxxxx ${url}${urlPoint}`();
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getAllEnergie = async (urlPoint) => {
    try {
      const response = await axios.get(`${url}${urlPoint}`);
      setTabEnergie(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getAllBoite = async (urlPoint) => {
    try {
      const response = await axios.get(`${url}${urlPoint}`);
      setTabBoite(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getAllVoiture('voiture');
    getAllEnergie('energie');
    getAllBoite('boite');
    getAllFicheTechnique('voiture/fiche_tech');
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAreAllInputValide(IsCaractereValide && IsNbPositif && IsDateValide);
    // if (areAllInputValide) {
    const alefa = axios.post(`${url}${postEndPoint}`, ficheTechnique, getHeaderToken());
    console.log(alefa);
    // }
  };

  const handleSetVoiture = async (e) => {
    const idVoiture = e.target.value;
    setIdVoiture(idVoiture);
    console.log("id voiture " + idVoiture);
  }

  const handleSetEnergie = async (e) => {
    const idEnergie = e.target.value;
    setIdEnergie(idEnergie);
    console.log("id Energie " + idEnergie);
  }
  const handleSetBoite = async (e) => {
    const idBoite = e.target.value;
    setIdBoite(idBoite);
    console.log("id Boite " + idBoite);

  }


  const handleSetMoteur = (e) => {
    const moteur = e.target.value;
    setMoteur(moteur);
  };

  const handleSetLitreMoteur = (e) => {
    const litreMoteur = e.target.value;
    setLitreMoteur(litreMoteur);
  };

  const handleSetConsommation = (e) => {
    const consommation = e.target.value;
    setConsommation(consommation);
  };

  const handleSetPuissance = (e) => {
    const puissance = e.target.value;
    setPuissance(puissance);
  };

  const handleSetNbVitesse = (e) => {
    const nbVitesse = e.target.value;
    setNbVitesse(nbVitesse);
  };

  const handleSetNbPlace = (e) => {
    const nbPlace = e.target.value;
    setNbPlace(nbPlace);
  };

  const handleSetNbPorte = (e) => {
    const nbPorte = e.target.value;
    setNbPorte(nbPorte);
  };

  const handleSetLongueur = (e) => {
    const longueur = e.target.value;
    setLongueur(longueur);
  };

  const handleSetPoids = (e) => {
    const poids = e.target.value;
    setPoids(poids);
  };

  return (
    <Container className="main-content container-fluid mt--7" fluid>
      <Row>
        <div className="col">
          <Card className='shadow' style={{ padding: 44 }}>

            <h1>fiche technique </h1>
            <form onSubmit={handleSubmit}>
              <p>
                <label>
                  Voiture :
                </label>

                <select className='form-control' onChange={handleSetVoiture} >
                  {tabVoiture.map((voiture) => (
                    <option value={voiture.idVoiture} >{voiture.nomModele}</option>
                  ))}
                </select>

              </p>
              <p>
                <label>
                  Energie :
                </label>

                <select className='form-control' onChange={handleSetEnergie} >
                  {tabEnergie.map((energie) => (
                    <option value={energie.idEnergie} >{energie.energie}</option>
                  ))}
                </select>
              </p>
              <p>
                <label>
                  type de boite de vitesse :
                </label>

                <select className='form-control' onChange={handleSetBoite} >
                  {tabBoite.map((boite) => (
                    <option value={boite.idBoite} >{boite.boite}</option>
                  ))}
                </select>
              </p>
              <p>
                <label>
                  Moteur :
                </label>
                <input className="form-control"
                  type="text"
                  name="moteur"
                  value={moteur}
                  onChange={handleSetMoteur}
                />
              </p>
              <p>
                <label>
                  litre Moteur :
                </label>
                  
                  <input className="form-control"
                    type="text"
                    name="litreMoteur"
                    value={litreMoteur}
                    onChange={handleSetLitreMoteur}
                  />
              </p>
              <p>
                <label>
                  consommation :
                </label>
                <input className="form-control"
                  type="text"
                  name="consommation"
                  value={consommation}
                  onChange={handleSetConsommation}
                />
                
              </p>
              <p>
                <label>
                  puissance :
                </label>
                <input className="form-control"
                  type="text"
                  name="puissance"
                  value={puissance}
                  onChange={handleSetPuissance}
                />
                
              </p>
              <p>
                <label>
                  nombre de vitesse :
                </label>
                <input className="form-control"
                  type="number"
                  name="nbVitesse"
                  value={nbVitesse}
                  onChange={handleSetNbVitesse}
                />
              </p>
              <p>
                <label>
                  nombre de place :
                </label>
                <input className="form-control"
                  type="number"
                  name="nbPlace"
                  value={nbPlace}
                  onChange={handleSetNbPlace}
                />
              </p>
              <p>
                <label>
                  nombre de porte :
                </label>
                <input className="form-control"
                  type="number"
                  name="nbPorte"
                  value={nbPorte}
                  onChange={handleSetNbPorte}
                />
              </p>
              <p>
                <label>
                  longueur en metre :
                </label>
                <input className="form-control"
                  type="text"
                  name="longueur"
                  value={longueur}
                  onChange={handleSetLongueur}
                />
              </p>
              <p>
                <label>
                  poids en kg :
                </label>
                <input className="form-control"
                  type="text"
                  name="poids"
                  value={poids}
                  onChange={handleSetPoids}
                />
              </p>

              <br />
              <button type="submit" className='btn btn-primary' style={{ backgroundColor: "black", color: "white", border: "none" }}>Insérer les données</button>
            </form>
            <CardBody style={{ overflowX: "scroll" }}>
              <Row className='icon-exemples'>
                {tabVoiture.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>FicheTechnique</th>
                        <th>Voiture</th>
                        <th>Energie</th>
                        <th>Boite</th>
                        <th>moteur</th>
                        <th>litreMoteur</th>
                        <th>consommation</th>
                        <th>puissance</th>
                        <th>nbVitesse</th>
                        <th>nbPlace</th>
                        <th>nbPorte</th>
                        <th>longueur</th>
                        <th>poids</th>
                        <th>energie</th>
                        <th>boite</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabFicheTechnique.map((value, index) => (
                        <tr key={index}>
                          <FicheTechniqueElement value={value} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Aucune fiche FicheTechnique disponible.</p>
                )}
              </Row>
            </CardBody>
          </Card>
        </div>
      </Row>

    </Container>
  );
}

FicheCrud.propTypes = {};

FicheCrud.defaultProps = {};

export default FicheCrud;
