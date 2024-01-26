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
  }, []);

  const handleCheckboxChange = (categoryId) => {
    alert(selectedCategories);
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
        <Card className='shadow'>
          <CardHeader className="bg-transparent">
            <h3 className='mb-4'>Action Pour Voiture</h3>
          </CardHeader>
          <h1>Voitures</h1> 
          {/* .... */}
          <form onSubmit={handleSubmit}>
            {categories.map((category) => (
              <label key={category.id}>
                <input
                  type="checkbox"
                  value={category.idCategorie}
                  onClick={() => handleCheckboxChange(category.idCategorie)}
                />
                {category.idCategorie}
              </label>
            ))}
            <select onChange={handleSetMarque} >
            {tabMarque.map((marque) => (
              <option value={marque.idMarque} >{marque.marque}</option>
            ))}
            </select>
            <input
                  type="text"
                  name="nomVoiture"
                  value={nomVoiture}
                  onChange={handleSetNomVoiture}
                  //onChange={(e) => handleInputChangeWithName(e, 'fieldName')}
            />
            <input
                  type="number"
                  name="annee"
                  value={annee}
                  onChange={handleSetAnnee}
                  //onChange={(e) => handleInputChangeWithName(e, 'fieldName')}
            />

            <button type="submit">Insérer les données</button>
          </form>
          {/* ... */}
          <CardBody>

            <Row className='icon-exemples'>
              {tabVoiture.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Marque</th>
                      <th>Année de sortie</th>
                      <th>Catégorie</th>
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
