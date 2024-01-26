import React from 'react';
import PropTypes from 'prop-types';
import styles from './Message.module.css';



const Message = (props) => (
  <div className={styles.Message}>
    <p className={props.author}>
      {props.author} {props.image}
    </p>
    <p>{props.message } {props.date} {props.hour}</p>
  </div>
);

Message.propTypes = {
  author: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  image: PropTypes.element,
};


Message.propTypes = {};
Message.defaultProps = {};


export default Message;
