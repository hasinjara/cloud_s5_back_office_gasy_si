import React from 'react';
import PropTypes from 'prop-types';
import styles from './ExceptionManager.module.css';

const ExceptionManager = (validateFunction) => {
  const [valeur, setValeur] = useState('');
  const [erreur, setErreur] = useState('');

  const handleChange = (e) => {
    const nouvelleValeur = e.target.value;
    setValeur(nouvelleValeur);

    const messageErreur = validateFunction(nouvelleValeur);
    setErreur(messageErreur);
  };

  return { valeur, erreur, handleChange };
};

ExceptionManager.propTypes = {};

ExceptionManager.defaultProps = {};

export default ExceptionManager;
