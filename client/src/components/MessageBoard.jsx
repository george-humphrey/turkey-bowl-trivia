import React from 'react';

const MessageBoard = (props) => {
  return (
    <div id='messageBoard'>
      <div id='message1' className='message'>{props.m1}</div>
      <div id='message2' className='message'>{props.m2}</div>
      <div id='message3' className='message'>{props.m3}</div>
    </div>
  )
};

export default MessageBoard;