import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from 'axios';
import { useAuth } from "AuthContext";
import GetByUrl from "components/MyService/GetByUrl";
import PutByUrl from "components/MyService/PutByUrl";
import {
  Card,
  Col,
  Row,
} from "reactstrap";
const VehiculeAxios = () => {

  const {url, getHeaderToken} = useAuth();

    const [annonces, setAnnonces] = useState([]);
    const [erreur, setErreur] = useState(String);
    const [message, setMessage] = useState(String);

    const boldStyle = {
      fontWeight: 'bold',
    };

    const divPhoto = { width: '100%', maxWidth: '500px' }
    const imgStyle = { width: '100%', height: '200px', objectFit: 'cover' }
    const endpoint = `${url}annonce`;  // Use ${url} instead of ${url}annonce
    console.log(GetByUrl(`marque`));
    const butStyle = {
      border: 'none',
      color: 'white',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
    }
  useEffect(() => {
    axios.get(endpoint)
      .then(response => {
        setAnnonces(response.data.data);
        setErreur(response.data.error);
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Erreur de requête VehiculeAxios :', error);
      });
  }, [endpoint]);  // Include endpoint as a dependency

  const handleValidation = async (id) => {
  console.log('Start handleValidation');
  const result = await PutByUrl(url, 'annonce/valider', id,null, getHeaderToken());

  // Faites quelque chose avec le résultat
  console.log(result);
};

const handleRefus = async (id) => {
  console.log(getHeaderToken());
  const result = await PutByUrl(url, `annonce/refuser`,id,null , getHeaderToken());

  // Faites quelque chose avec le résultat
  console.log(result);
};
    return(
        <>

        {erreur === "aucun" ? (

          annonces.length === 0 ? (
            <p>No data available</p>
          ) : (
            annonces.map((annonce, index) => (
              
           <Col key={annonce.details.idAnnonce} lg="4" md="6">

             <CopyToClipboard>
               {/* Utilisez le composant Link pour créer un lien avec l'ID */}
                  {/* <Link to={`/admin/annonceDetail/${annonce.details.idAnnonce}`}> */}
              <button
                className="btn-icon-clipboard"
                type="button"
              >
                <div>
                  <span>
                    <p> <span style={boldStyle}>Prix :</span> {annonce.details.prixVente.toLocaleString('fr-FR')}</p>
                    <p>
                        <span>{annonce.details.marque}</span>
                        <span>{annonce.details.nomModele}</span>
                        <span>{annonce.details.categorie}</span>
                    </p>
                    <p>
                        <span>{annonce.details.kilometrage.toLocaleString('fr-FR')} </span> Km
                        <span>etat: {annonce.details.etat} </span>
                        <span></span>
                    </p>
                    
                   </span>
                  
                </div>
                 <div style={divPhoto}>
                     <img 
                      alt={annonce.photos[0] ? "Car_"+annonce.photos[0].idAnnoncePhoto : "Car photo"}
                      
                      src={annonce.photos[0] ? annonce.photos[0].urlPhoto : require("../../assets/img/car/fiat-pande.png")}
                      style={imgStyle}
                    />

                 </div>
                 
                 <Row>
                  <div className="d-flex justify-content-center mx-auto">
                    <a onClick={() => handleValidation(annonce.details.idAnnonce)} style={butStyle} className="mr-4 mt-2 btn-warning btn-sm">Valider</a>
                    <a onClick={() => handleRefus(annonce.details.idAnnonce)} style={butStyle} className="float-right mt-2 btn-default btn-sm">Annuler</a>
                  </div>
                 </Row>
               </button>
               {/* </Link> */}
             </CopyToClipboard>
          </Col>
        )))

        ) : (<h1>{message}</h1>)}
        </>
    )

}

export default VehiculeAxios;