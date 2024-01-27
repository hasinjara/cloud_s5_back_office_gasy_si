import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import GetByUrl from 'components/MyService/GetByUrl';
import PutByUrl from 'components/MyService/PutByUrl';
import { Card, Col, Row } from 'reactstrap';
import { TailSpin as Loader } from "react-loader-spinner";

const VehiculeAxios = () => {
  const { url, getHeaderToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const loadStyle = {
      
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // 100% de la hauteur de la fenêtre
    width: '100vw', // 100% de la largeur de la fenêtre
  }
  const [annonces, setAnnonces] = useState([]);
  const [erreur, setErreur] = useState(String);
  const [message, setMessage] = useState(String);
  const [hiddenCopyToClipboard, setHiddenCopyToClipboard] = useState([]);

  const boldStyle = {
    fontWeight: 'bold',
  };

  const divPhoto = { width: '100%', maxWidth: '500px' };
  const imgStyle = { width: '100%', height: '200px', objectFit: 'cover' };
  const endpoint = 'annonce/non_valide';

  const butStyle = {
    border: 'none',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    backgroundColor:'black',
    fontSize:'small'
  };
  const del = {
    // border: 'none',
    color: 'black',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    backgroundColor:'white',
    fontSize:'small',
    border:'0.7 solid black'
  };


  useEffect(() => {
    axios
      .get(`${url}${endpoint}`, getHeaderToken())
      .then((response) => {
        setAnnonces(response.data.data);
        setErreur(response.data.error);
        setMessage(response.data.message);
        // Initialize hidden state for each CopyToClipboard
        setHiddenCopyToClipboard(new Array(response.data.data.length).fill(false));
        setLoading(false); // Set loading to false regardless of success or failure
      
      })
      .catch((error) => {
        console.error('Erreur de requête VehiculeAxios :', error);
      });
  }, [endpoint, url]);

  const handleValidation = async (id, index, e ) => {
    // Set the corresponding CopyToClipboard as hidden
    e.preventDefault();
    setHiddenCopyToClipboard((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    // Perform validation logic
    const result = await PutByUrl(url, 'annonce/valider', id, null, getHeaderToken());
    console.log(result);
  };

  const handleRefus = async (id, index, e) => {
    // Set the corresponding CopyToClipboard as hidden
    e.preventDefault();
    setHiddenCopyToClipboard((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    // Perform refusal logic
    const result = await PutByUrl(url, `annonce/refuser`, id, null, getHeaderToken());
    console.log(result);
  };

  if (loading) {
    return <>
    <div
      style={loadStyle}
    >
      <Loader type="TailSpin" color="#32325d" height={80} width={80} style={{ width: '45%' }} />
    </div></>

  }

  return (
    <>
      {erreur === 'aucun' ? (
        annonces.length === 0 ? (
          <p>No data available</p>
        ) : (
          annonces.map((annonce, index) => (
            <Col key={annonce.details.idAnnonce} lg="4" md="6">
              {!hiddenCopyToClipboard[index] && (
                <CopyToClipboard>
                  {/* Utilisez le composant Link pour créer un lien avec l'ID */}
                  <Link to={`/admin/annonceDetail/${annonce.details.idAnnonce}`}>
                    <button className="btn-icon-clipboard" type="button">
                      <div>
                        <span>
                          <p>
                            <span style={boldStyle}>Prix :</span>{' '}
                            {annonce.details.prixVente.toLocaleString('fr-FR')}
                          </p>
                          <p>
                            <span>{annonce.details.marque}</span>
                            <span>{annonce.details.nomModele}</span>
                            <span>{annonce.details.categorie}</span>
                          </p>
                          <p>
                            <span>{annonce.details.kilometrage.toLocaleString('fr-FR')} </span> Km
                            <span></span>
                          </p>
                        </span>
                      </div>
                      <div style={divPhoto}>
                        <img
                          alt={
                            annonce.photos[0]
                              ? 'Car_' + annonce.photos[0].idAnnoncePhoto
                              : 'Car photo'
                          }
                          src={
                            annonce.photos[0]
                              ? annonce.photos[0].urlPhoto
                              : require('../../assets/img/car/fiat-pande.png')
                          }
                          style={imgStyle}
                        />
                      </div>
                      <Row>
                        <div className="d-flex justify-content-center mx-auto">
                          <a
                            //style={{backgroundColor:"black",color:"white"}}
                            onClick={(e) => handleValidation(annonce.details.idAnnonce, index, e)}
                            style={butStyle}
                            className="mr-4 mt-2 btn-primary btn-sm"
                            // className=" btn-pri"
                          >
                            Valider
                          </a>
                          <a
                          
                            onClick={(e) => handleRefus(annonce.details.idAnnonce, index, e)}
                            style={del}
                            className="float-right mt-2 btn-default btn-sm"
                          >
                            Annuler
                          </a>
                        </div>
                      </Row>
                    </button>
                  </Link>
                </CopyToClipboard>
              )}
            </Col>
          ))
        )
      ) : (
        <h1>{message}</h1>
      )}
    </>
  );
};

export default VehiculeAxios;
