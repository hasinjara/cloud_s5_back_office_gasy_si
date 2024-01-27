import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import styles from './StatTest.module.css';

const StatTest = () => {
  // Exemple de données de test, remplacez-les par vos propres données
  const data = [
    { category: 'A', value: 10 },
    { category: 'B', value: 15 },
    { category: 'C', value: 20 },
    { category: 'D', value: 12 },
  ];

  return (
    <div className={styles.StatTest}>
      <VictoryChart theme={VictoryTheme.material}
        domainPadding={20} >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryBar data={data} x="category" y="value" />
      </VictoryChart>
    </div>
  );
};

StatTest.propTypes = {};

StatTest.defaultProps = {};

export default StatTest;
