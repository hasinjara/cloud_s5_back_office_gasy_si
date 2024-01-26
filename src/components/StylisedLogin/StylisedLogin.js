import React from 'react';
import PropTypes from 'prop-types';
import styles from './StylisedLogin.module.css';
import Login from '../../views/examples/Login';
const StylisedLogin = () => (
  <div className={styles.StylisedLogin}>
    <Login/>
  </div>
);

StylisedLogin.propTypes = {};

StylisedLogin.defaultProps = {};

export default StylisedLogin;
