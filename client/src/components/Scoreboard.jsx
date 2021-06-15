import React from 'react';

const Scoreboard = (props) => {

  return (
    <div id='scoreboard'>
      <div id='team1Name' className='teamName' onClick={() => props.changeName('team1')}>{props.t1Name} </div>
      <div id='team1Score' className='teamScore'>{props.t1Score}</div>
      <div id='gameClock'>Q{props.q}</div>
      <div id='team2Score' className='teamScore'>{props.t2Score}</div>
      <div id='team2Name' className='teamName' onClick={() => props.changeName('team2')}>{props.t2Name}</div>
    </div>
  )
}

export default Scoreboard;