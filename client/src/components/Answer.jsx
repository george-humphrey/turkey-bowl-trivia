import React from 'react';

const Answer = (props) => {
  if (props.answer === '') {
    return (
      <div className='emptyAnswer'></div>
    )
  } else {
    return (
      <button id='answerABox' className='answerBox' onClick={() => { props.click(props.letter, props.answer) }}>
        <div id='answerALetter' className='answerLetter'>{props.letter}</div>
        <div id='answerAText' className='answerText'>{props.answer}</div>
      </button>
    )
  }
}

export default Answer;