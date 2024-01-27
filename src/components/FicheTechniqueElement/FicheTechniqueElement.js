import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styles from './FicheTechniqueElement.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FicheTechniqueElement = ({ value }) => {
  
  const [FicheTechniqueElement] = useState(value);

  return (<>
    {/* <td>{FicheTechniqueElement.idFicheTechnique}</td> */}
    <td>{FicheTechniqueElement.idVoiture}</td>
    <td>{FicheTechniqueElement.idEnergie}</td>
    <td>{FicheTechniqueElement.idBoite}</td>
    <td>{FicheTechniqueElement.moteur}</td>
    <td>{FicheTechniqueElement.litreMoteur}</td>
    <td>{FicheTechniqueElement.consommation}</td>
    <td>{FicheTechniqueElement.puissance}</td>
    <td>{FicheTechniqueElement.nbVitesse}</td>
    <td>{FicheTechniqueElement.nbPlace}</td>
    <td>{FicheTechniqueElement.nbPorte}</td>
    <td>{FicheTechniqueElement.longueur}</td>
    <td>{FicheTechniqueElement.poids}</td>
    <td>{FicheTechniqueElement.energie}</td>
    <td>{FicheTechniqueElement.boite}</td>
    <td><button className="btn-primary"> Modifier</button></td>
  </>
  );

}

FicheTechniqueElement.propTypes = {};

FicheTechniqueElement.defaultProps = {};

export default FicheTechniqueElement;
