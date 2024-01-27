import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './VoitureCrud.module.css';
import Voiture from 'components/voiture/voiture';
import { useAuth } from 'AuthContext';
import { useEffect } from 'react';
import axios from 'axios';


import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap"

const VoitureCrud = () => {
  const { login, url, getIdUser, getHeaderToken, getToken } = useAuth();


  const [tabMarque,setTabMarque] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [tabVoiture,setTabVoiture] = useState([]);
  const [categories,setTabCateg] = useState([]);
  const [nomVoiture,setNomVoiture] = useState('');
  const [idMarque,setIdMarque] = useState('');
  const [annee,setAnnee] = useState('');

  const car = {
    'idMarque' : idMarque,
    'categories_possible' : selectedCategories,
    'nomModele' : nomVoiture,
    'anneSortie' : annee,
  }

  // const car = {
  //   idMarque : idMarque,
  //   categories_possible : categories,
  //   nomModel : nomVoiture,
  //   anneSortie : annee,
  // }

  const postEndPoint = "voiture";


  const getAll = async (urlPoint) => {
    try {
      const response = await axios.get(`${url}${urlPoint}`);
      setTabVoiture(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getAllMarque = async (urlPoint) => {
      try {
        const response = await axios.get(`${url}${urlPoint}`);
        setTabMarque(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  const getAllCateg = async (urlPoint) => {
      try {
        const response = await axios.get(`${url}${urlPoint}`);
        setTabCateg(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  useEffect(() => {
    getAll('voiture_marque');
    getAllCateg('categorie');
    getAllMarque('marque');
  }, [url, getToken()]);

  const handleCheckboxChange = (categoryId) => {
    //alert(selectedCategories);
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alefa = axios.post(`${url}${postEndPoint}`, car, getHeaderToken());
    // console.log(car);
    // console.log(`${url}${postEndPoint}`, car, getHeaderToken());
    console.log(alefa);
  };

  

  const handleSetMarque = (e) => {
    const huhu = e.target.value;
    setIdMarque(huhu);
    console.log('idMarque : '+idMarque);
    
  };

  const handleSetNomVoiture = (e) =>{
    const temp = e.target.value;
    setNomVoiture(temp);
  }

  const handleSetAnnee = (e) =>{
    const temp = e.target.value;
    setAnnee(temp);
    console.log('annee : '+annee);
  }

return (
  <Container className="main-content container-fluid mt--7" fluid>
    <Row>
      <div className="col">
        <Card className='shadow' style={{padding: 38}}>
         
          <h3>Insertion de voiture</h3> 
          <br/>
          {/* .... */}
          
          <form onSubmit={handleSubmit}>
          <p>Choix de ses categories</p>
            <div style={{display: "flex",
            height: "auto",
            justifyContent: "space-evenly"}}>
      
              {categories.map((category) => (
                <p>
                <label key={category.categorie}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={category.idCategorie}
                    onClick={() => handleCheckboxChange(category.idCategorie)}
                  />
                  {category.categorie}
                </label>
                </p>
              ))}
            </div>
            <label>Marque</label>
            <select className='form-control' onChange={handleSetMarque} >
            {tabMarque.map((marque) => (
              <option value={marque.idMarque} >{marque.marque}</option>
            ))}
            </select>
            
            <label>Nom du modele</label>
            <input
                  className='form-control'
                  type="text"
                  name="nomVoiture"
                  value={nomVoiture}
                  onChange={handleSetNomVoiture}
                  //onChange={(e) => handleInputChangeWithName(e, 'fieldName')}
            />
            <label>Annee de sortie</label>
            <input
                className='form-control'
                  type="number"
                  name="annee"
                  value={annee}
                  onChange={handleSetAnnee}
                  //onChange={(e) => handleInputChangeWithName(e, 'fieldName')}
            />
            <br/>

            <button type="submit" className='btn bn-primary' style={{backgroundColor:"black",color:"white",fontSize:"smaller"}}>Insérer les données</button>
          </form><br/><br/>
          {/* ... */}
          <h3>Liste des voitures</h3>
          <CardBody>
            <Row className='icon-exemples'>
              {tabVoiture.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Marque</th>
                      <th>Année de sortie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabVoiture.map((value, index) => (
                      <tr key={index}>
                        <Voiture value={value} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucune voiture disponible.</p>
              )}
            </Row>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Container>
) ;

}

VoitureCrud.propTypes = {};

VoitureCrud.defaultProps = {};

export default VoitureCrud;
