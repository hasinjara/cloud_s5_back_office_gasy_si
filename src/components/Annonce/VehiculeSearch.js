// reactstrap components
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from 'react-router-dom';
import {Col} from "reactstrap";
  // core components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "AuthContext";
import { useLocation } from 'react-router-dom';
import { TailSpin as Loader } from "react-loader-spinner";

  const VehiculeSearch = () =>{
    const {url} = useAuth();
    const [loading, setLoading] = useState(true);
    const loadStyle = {
      
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // 100% de la hauteur de la fenêtre
      width: '100vw', // 100% de la largeur de la fenêtre
    }
    const location = useLocation();
const params = new URLSearchParams(location.search);

// Retrieve the encoded data from the URL parameter
const encodedData = params.get('data');

const divPhoto = { width: '100%', maxWidth: '500px' }
const imgStyle = { width: '100%', height: '200px', objectFit: 'cover' }

// Parse the encoded data back into an object
const data = JSON.parse(decodeURIComponent(encodedData));

  // Use data as needed
    const search = data.search; 
  
    const [annonces, setAnnonces] = useState([]);
      const [erreur, setErreur] = useState(String);
      const [message, setMessage] = useState(String);
    const boldStyle = {
        fontWeight: 'bold',
    };
    useEffect(() => {
    // Exemple de requête GET avec Axios
    axios.get(`${url}annonce/search/${search}`)
        .then(response => {
        // Met à jour l'état avec les données de l'API
        setAnnonces(response.data.data);
        setErreur(response.data.error);
        setMessage(response.data.message);
        setLoading(false); // Set loading to false regardless of success or failure
        })
        .catch(error => {
        console.error('Erreur de requête VehiculeAxios :', error);
        } );
    }, [url,search]);
  
    if (loading) {
      return <>
      <div
        style={loadStyle}
      >
        <Loader type="TailSpin" color="#32325d" height={80} width={80} style={{ width: '45%' }} />
      </div></>

    }

      return(
        <>

        { erreur === "aucun" ? ( 

          annonces.length === 0 ? (
          <p>No data available</p>
        ) : (
          
            annonces.map((annonce, index) => (
           <Col key={annonce.details.idAnnonce} lg="4" md="6"> 

             <CopyToClipboard>
               {/* Utilisez le composant Link pour créer un lien avec l'ID */}
                  <Link to={`/admin/annonceDetail/${annonce.details.idAnnonce}`}>
              <button
                 className="btn-icon-clipboard" 
                 type="button" 
               > 
                 <div> 
                   <span> 
                     <p> <span style={boldStyle}>Prix :</span> {annonce.details.prixVente}</p> 
                     <p> 
                         <span>{annonce.details.marque}</span> 
                         <span>{annonce.details.nomModele}</span> 
                         <span>{annonce.details.categorie}</span> 
                     </p> 
                     <p> 
                         <span>{annonce.details.kilometrage} </span>Km 
                         <span>etat: {annonce.details.etat} </span> 
                         <span></span> 
                     </p> 
                    
                    </span> 
                  
                 </div> 
                  <div style={divPhoto} >  
                    
                  <img 
                      alt={annonce.photos[0] ? "Car_"+annonce.photos[0].idAnnoncePhoto : "Car photo"}
                      
                      src={annonce.photos[0] ? annonce.photos[0].urlPhoto : require("../../assets/img/car/fiat-pande.png")}
                      style={imgStyle}
                    />
                  

                  </div> 
                </button> 
                </Link> 
              </CopyToClipboard> 
          </Col> 
         ))) 

         ) : (<h1>{message}</h1>)} 
        </>
      )
  }
  
  export default VehiculeSearch;
  
  