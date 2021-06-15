import React from 'react';

const FootballField = (props) => {
  return (
    <div id='footballfield'>
      <div id='team1EndZone' className='endZone' >
        <div id='team1Logo' className='teamLogo' onClick={() => props.change(1)}>{props.logo1}</div>
      </div>
      <div id='scrimmageLine' ></div>
      <div id='ball' ></div>
      <div id='field' ></div>
      <div id='team2EndZone' className='endZone'>
        <div id='team2Logo' className='teamLogo' onClick={() => props.change(2)}>{props.logo2}</div>
      </div>
    </div >
  )
}

export default FootballField;