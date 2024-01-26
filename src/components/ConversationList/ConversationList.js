import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConversationList.module.css';
import Message from '../Message/Message'; 


const ConversationList = ({ sender,LastMessage }) => (
  <div className={styles.ConversationList}>
      <Message author={sender} message={LastMessage} />
  </div>
);

ConversationList.propTypes = {
  sender: PropTypes.string.isRequired,
  LastMessage: PropTypes.string.isRequired,
};

export default ConversationList;
