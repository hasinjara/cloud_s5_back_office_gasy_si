import React from 'react';
import PropTypes from 'prop-types';
import Message from '../Message/Message.js';
import styles from './MessageBox.module.css';

const MessageBox = ({ messages, author}) => {
  const sortedMessages = messages.sort((a, b) => new Date(a.date + ' ' + a.hour) - new Date(b.date + ' ' + b.hour));

  return (
    <div className={`${author} mesageBox`}>
      {sortedMessages.map((message, index) => (
        <Message
          key={index}
          author={author}
          message={message.message}
          image={message.image}
          date={message.date}
          hour={message.hour}
        />
      ))}
    </div>
  );
};

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      image: PropTypes.element,
      date: PropTypes.string.isRequired,
      hour: PropTypes.string.isRequired,
    })
  ).isRequired,
  author: PropTypes.string.isRequired,
};

export default MessageBox;
