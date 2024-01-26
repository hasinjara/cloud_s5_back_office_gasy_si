import React from 'react';
import PropTypes from 'prop-types';
import styles from './MessageInputBar.module.css';

const MessageInputBar = (props) => (
  <div className={styles.MessageInputBar}>
    <span className={props.author}>{props.author}
      {props.image}
    </span> 
    <span>
    :<input type="text" ></input>
    </span>
    <span>
    {props.icons}
    </span>
  </div>
);

MessageInputBar.propTypes = {};

MessageInputBar.defaultProps = {};

export default MessageInputBar;
