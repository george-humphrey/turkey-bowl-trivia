import React from 'react';
import Answer from './Answer.jsx'

const QandA = (props) => {
  if (props.q === '') {
    return (
      <div id='emptyQuestion' />
    )
  } else {
    return (
      <div id='qanda'>
        <div id='question'>{props.q}</div>
        <div id='answers'>
          <Answer letter={'A'} answer={props.aA} click={props.click} />
          <Answer letter={'B'} answer={props.aB} click={props.click} />
          <Answer letter={'C'} answer={props.aC} click={props.click} />
          <Answer letter={'D'} answer={props.aD} click={props.click} />
        </div>
      </div>
    )
  }
}

export default QandA;