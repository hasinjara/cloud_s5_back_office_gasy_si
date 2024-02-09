// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import axios from 'axios';
import { TailSpin as Loader } from "react-loader-spinner";
import { useAuth } from "AuthContext";


const AnnonceDetail = () =>{

  const {idAnnonce} = useParams(); 
  const [loading, setLoading] = useState(true);

  const [annonces, setAnnonces] = useState([]);
    const [erreur, setErreur] = useState(String);
    const [message, setMessage] = useState(String);

    const [slides, setSlides] = useState([]);
    const {url} = useAuth();

    const loadStyle = {
      
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // 100% de la hauteur de la fenêtre
      width: '100vw', // 100% de la largeur de la fenêtre
    }

    function getUnite(energie) {
      if(energie == "Electrique") {
        return "Kw/100 km";
      }
      return "L/100 km";
    }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}annonce/${idAnnonce}`);
        setAnnonces(response.data.data);
          setErreur(response.data.error);
          setMessage(response.data.message);

          // Create slides based on fetched data
      const slidesData = response.data.data.photos.map((photo) => ({
        url: photo.urlPhoto,
        title: `Car_${photo.idAnnoncePhoto}`,
      }));
      setSlides(slidesData);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData(); // Call the function
    // Cleanup function (optional)
    return () => {
      // Cleanup code (if needed)
    };
  }, [url,idAnnonce]); // Empty dependency array means it runs once after the initial render

  const slideRowStyle = {
    marginBottom: "100px",
  }  

  

  const slidesDefault = [
    { url: require("assets/img/car/fiat-pande.png"), title: "fiat-pande" },
    { url: require("assets/img/car/fiat-panda.jpg"), title: "fiat-look" },
    
  ];
  
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };
    const boldStyle = {
        fontWeight: 'bold',
      };

    if (loading) {
      return <>
      <div
        style={loadStyle}
      >
        <Loader type="TailSpin" color="#32325d" height={80} width={80} style={{ width: '45%' }} />
      </div></>

    }

    if(annonces.details) {
      return(
        <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Annonces</h3>
              </CardHeader>
              <CardBody>
                <h4>Ref-Annonce : {idAnnonce}</h4>
                <Row style={slideRowStyle}>
                  <Col lg="8" md="12">
                    <div style={containerStyles}>
                      <ImageSlider slides={slides && slides.length > 0 ? slides : slidesDefault} />
                    </div>
                  </Col >
                  <Col lg="4" md="12">
                    <Row>
                      <Col lg="6" md="6">
                      
                      {annonces.details.dateAnnonce && <p>Date Annonce: </p>}
                      
                      {annonces.details.nom && <p>Nom: </p>}
                      {annonces.details.prenom && <p>Prénom: </p>}
                      {annonces.details.mail && <p>Mail: </p>}
                      
                      
                      </Col>
                      <Col lg="6" md="6">
                      <p><span style={boldStyle}>{annonces.details.dateAnnonce}</span></p>
                      
                      <p><span style={boldStyle}>{annonces.details.nom}</span></p>
                      <p><span style={boldStyle}>{annonces.details.prenom}</span></p>
                      <p><span style={boldStyle}>{annonces.details.mail}</span></p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                  
                <Row className="icon-examples">

                  <Col lg="6" md="12">
                    <h2>Generale</h2>
                    {/* <p>ID Utilisateur: <span style={boldStyle}>{annonces.details.idUsers}</span></p>
                  <p>ID Voiture: <span style={boldStyle}>{annonces.details.idVoiture}</span></p>
                  <p>ID Fiche Technique: <span style={boldStyle}>{annonces.details.idFicheTechnique}</span></p> */}
                  {/* <p>ID Categorie: <span style={boldStyle}>{annonces.details.idCategorie}</span></p> */}
                  {/* <p>ID Marque: <span style={boldStyle}>{annonces.details.idMarque}</span></p> */}
                  <Row>
                    
                    <Col lg="6" md="6">
                    {annonces.details.nomModele && <p>Nom Modèle: </p>}
                    {annonces.details.anneSortie && <p>Année de Sortie: </p>}
                    {annonces.details.etatVoiture && <p>État Voiture: </p>}
                    {annonces.details.marque && <p>Marque: </p>}
                    {annonces.details.categorie && <p>Catégorie: </p>}
                    {annonces.details.prixVente && <p>Prix de Vente: </p>}
                    </Col>
                    <Col lg="6" md="6">
                    <p><span style={boldStyle}>{annonces.details.nomModele}</span></p>
                    <p><span style={boldStyle}>{annonces.details.anneSortie}</span></p>
                    <p><span style={boldStyle}>{annonces.details.etatVoiture} / 10 </span></p>
                    <p><span style={boldStyle}>{annonces.details.marque}</span></p>
                    <p><span style={boldStyle}>{annonces.details.categorie}</span></p>
                    <p><span style={boldStyle}>{annonces.details.prixVente.toLocaleString('fr-FR')} Ar</span></p>
                    </Col>
                  </Row>
                  <h2>Apparence</h2>
                    {/* <p>Longueur: <span style={boldStyle}>{annonces.details.longueur}</span></p> */}
                    <Row>
                      <Col lg="6" md="6">
                        {annonces.details.poids && <p>Poids: </p>}
                        {annonces.details.nbPlace && <p>Nombre de Place: </p>}
                        {annonces.details.nbPorte && <p>Nombre de Porte: </p>}
                      </Col>
                      <Col lg="6" md="6">
                        <p><span style={boldStyle}>{annonces.details.poids.toLocaleString('fr-FR')} Kg</span></p>
                        <p><span style={boldStyle}>{annonces.details.nbPlace}</span></p>
                        <p><span style={boldStyle}>{annonces.details.nbPorte}</span></p>
                      </Col>
                    </Row>
                  </Col>

                  <Col lg="6" md="12">
                    <h2>Engine</h2>
                    <Row>
                      <Col lg="6" md="6">
                        
                        {annonces.details.kilometrage && <p>Kilométrage: </p>}
                        {/* {annonces.details.etat && <p>État: </p>} */}
                        {annonces.details.energie && <p>Énergie: </p>}
                        {annonces.details.boite && <p>Boîte: </p>}
                      </Col>
                      <Col lg="6" md="6">
                       
                        <p><span style={boldStyle}>{annonces.details.kilometrage.toLocaleString('fr-FR')} Km</span></p>
                        {/* <p><span style={boldStyle}>{annonces.details.etat}</span></p> */}
                        <p><span style={boldStyle}>{annonces.details.energie}</span></p>
                        <p><span style={boldStyle}>{annonces.details.boite}</span></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" md="6">
                        {annonces.details.moteur && <p>Moteur: </p>}
                        {annonces.details.litreMoteur && <p>Litre Moteur: </p>}
                        {annonces.details.consommation && <p>Consommation: </p>}
                        {annonces.details.puissance && <p>Puissance: </p>}
                        {annonces.details.nbVitesse && <p>Nombre de Vitesse: </p>}
                      </Col>
                      <Col lg="6" md="6">
                        <p><span style={boldStyle}>{annonces.details.moteur}</span></p>
                        <p><span style={boldStyle}>{annonces.details.litreMoteur} L</span></p>
                        <p><span style={boldStyle}>{annonces.details.consommation} {getUnite(annonces.details.energie)} </span></p>
                        <p><span style={boldStyle}>{annonces.details.puissance} CV</span></p>
                        <p><span style={boldStyle}>{annonces.details.nbVitesse}</span></p>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <h2>Description</h2>
                    <p>{annonces.details.description}</p>
                  </Col>

                  </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
           
        </>
     )
    } else {
      return (
        <>
          <Container>
            <Row>
              <Col>
                <p>Retourner sur la liste</p>
              </Col>
            </Row>
          </Container>
        </>
      )
    }
      

    
}

export default AnnonceDetail;

