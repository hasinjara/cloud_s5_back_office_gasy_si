import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChatBox.module.css';
import ConversationList from '../ConversationList/ConversationList';
import MessageBox from '../MessageBox/MessageBox';
import MessageInputBar from '../MessageInputBar/MessageInputBar';

const ChatBox = (props) => (
  <div className={styles.ChatBox}>
      < MessageBox messages ={props.messages}/>
      < MessageInputBar />
  </div>
);

ChatBox.propTypes = {};

export default ChatBox;
