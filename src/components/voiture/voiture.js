import React,{ useState } from 'react';

import PropTypes from 'prop-types';
import styles from './voiture.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Voiture = ({ value }) => {
  
  const [voiture] = useState(value);
  
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
