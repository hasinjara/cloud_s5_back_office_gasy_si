import React,{ useState } from 'react';

import PropTypes from 'prop-types';
import styles from './voiture.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Voiture = ({ value }) => {
  
  const [voiture] = useState(value);
  


  // const ajouterAuPanier = () => {
  //   if (stock.stock > 0) {
  //     setStock(prevState => ({
  //       stock: stock.stock - 1
  //     })); 
  //   } else {
  //     alert("Désolé, le produit est en rupture de stock !");
  //   }
  // };
  
  return(<>
  <td>{voiture.nomModele}</td>
  <td>{voiture.marque}</td>
  <td>{voiture.anneSortie}</td>
  <td><button class="btn btn-primary">Modifier</button></td>
</>
);

}

Voiture.propTypes = {};

Voiture.defaultProps = {};

export default Voiture;
